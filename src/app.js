import { TabNavigator } from 'react-navigation';
import ScanPage from './components/ScanPage';
import HistoryPage from './components/HistoryPage';

const App = TabNavigator({
    Scan: {screen: ScanPage},
    History: {screen: HistoryPage}
}, {
    tabBarOptions: {
        activeTintColor: '#e91e63',
    },
});

export default App;