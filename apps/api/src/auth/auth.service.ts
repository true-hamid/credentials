import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Encrypt } from './ecrypt.entity';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(Encrypt)
    private readonly encryptRepository: Repository<Encrypt>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async decryptPayload(
    encryptedPayload: { encryptedUsername: string; encryptedPassword: string },
    randomId: string,
    publicKey: string
  ): Promise<Partial<User>> {
    const encrypt = await this.encryptRepository.findOneBy({
      randomId,
      publicKey,
    });
    const { privateKey: privateKeyString } = encrypt;
    const payload = {
      username: this.decryptStringWithRsaPrivateKey(
        encryptedPayload.encryptedUsername,
        privateKeyString
      ),
      password: this.decryptStringWithRsaPrivateKey(
        encryptedPayload.encryptedPassword,
        privateKeyString
      ),
    };
    this.deleteCredsAfterSuccessfulDecryption(encrypt);
    return payload;
  }

  // We are deleting in order to maintain a clean table
  async deleteCredsAfterSuccessfulDecryption(encrypt: Encrypt) {
    this.encryptRepository.delete(encrypt);
    return encrypt;
  }

  decryptStringWithRsaPrivateKey(toDecrypt: string, privateKeyString: string) {
    const buffer = Buffer.from(toDecrypt, 'base64');
    const privateKey = crypto.createPrivateKey(privateKeyString);
    return crypto
      .privateDecrypt(
        {
          key: privateKey,
          padding: crypto.constants.RSA_PKCS1_PADDING, // Use PKCS#1 v1.5 padding
        },
        buffer
      )
      .toString();
  }

  getAuthParams() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048, // the length of your key in bits
    });
    const pbk = publicKey.export({ type: 'pkcs1', format: 'pem' });
    const pvk = privateKey.export({ type: 'pkcs1', format: 'pem' });
    const randomId = crypto.randomBytes(16).toString('hex');
    const encrypt = new Encrypt();
    encrypt.privateKey = pvk.toString();
    encrypt.publicKey = pbk.toString();
    encrypt.randomId = randomId;
    this.encryptRepository.save(encrypt);
    return {
      pbk,
      randomId,
    };
  }

  public async validateUserExists(username: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ username });
    return !!user;
  }

  public getTokenForUser(user: User): string {
    return this.jwtService.sign({ username: user.username, sub: user.id });
  }

  hashPassword(password: string): string {
    const SALT_ROUNDS = 8;
    return bcrypt.hashSync(password, SALT_ROUNDS);
  }

  validatePasswordsMatch(password1: string, password2: string): boolean {
    return bcrypt.compareSync(password1, password2);
  }

  createUser(user: User) {
    return this.userRepository.save(user);
  }
}
