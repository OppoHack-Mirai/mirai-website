import React from 'react';
import Sidebar from './Sidebar';
import SettingsContent from './SettingsContent';

class Settings extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="wrapper">
                <Sidebar active="settings" />
                <SettingsContent />
            </div>
        );
    }
}

export default Settings;