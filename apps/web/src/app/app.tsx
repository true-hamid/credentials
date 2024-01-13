import NxWelcome from './nx-welcome';
import PreLaunch from './preLaunch/preLaunch';

export function App() {
  return (
    <PreLaunch>
      <NxWelcome title="web" />
    </PreLaunch>
  );
}

export default App;
