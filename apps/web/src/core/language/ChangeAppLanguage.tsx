// import React from 'react';
// import { View, Image } from 'react-native';
// import { TouchableRipple } from 'react-native-paper';
// import { i18n } from '@localization';
// import { Menu } from '@native-ui';
// import { StorageKeys } from '@utils';

// export const ChangeAppLanguage: React.FC = () => {
//   const [languagemenuVisible, setLanguagemenuVisible] = React.useState(false);
//   const appLanguages = [
//     {
//       label: i18n.t('english_US'),
//       value: 'en-US',
//     },
//     { label: i18n.t('arabic_SD'), value: 'ar-SD' },
//     { label: i18n.t('arabic_AE'), value: 'ar-AE' },
//   ];

//   const onLanguageSelect = (language: string) => {
//     AppStorage.saveToStorageValue(StorageKeys.APP_LANG, language);
//   };

//   return (
//     <View>
//       <Menu
//         onCloseMenu={() => {
//           setLanguagemenuVisible(false);
//         }}
//         menuVisible={languagemenuVisible}
//         anchorStyle={{ width: '50%', alignItems: 'flex-start' }}
//         data={appLanguages}
//         onItemSelect={onLanguageSelect}
//         anchor={
//           <TouchableRipple onPress={() => setLanguagemenuVisible(true)}>
//             <Image
//               source={require('./language.png')}
//               style={{ width: 24, height: 24 }}
//               width={16}
//               height={16}
//             />
//           </TouchableRipple>
//         }
//         clickableLabel={i18n.t('selectCountry')}
//       />
//     </View>
//   );
// };