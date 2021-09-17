import {connect} from 'react-redux';

import {getCurrentChannelId} from 'mattermost-redux/selectors/entities/channels';

import {Client4} from 'mattermost-redux/client';

import {voiceConnectedChannels, voiceConnectedProfilesInChannel, connectedChannelID} from 'selectors';

import CallToast from './component';

const mapStateToProps = (state) => {
    let hasCall = false;
    const currentID = getCurrentChannelId(state);
    const connectedID = connectedChannelID(state);
    const channels = voiceConnectedChannels(state);

    let profiles = [];
    const pictures = [];
    if (currentID !== connectedID && channels) {
        const users = channels[currentID];
        if (users && users.length > 0) {
            hasCall = true;
            profiles = voiceConnectedProfilesInChannel(state, currentID);
            for (let i = 0; i < profiles.length; i++) {
                pictures.push(Client4.getProfilePictureUrl(profiles[i].id, profiles[i].last_picture_update));
            }
        }
    }
    return {
        currChannelID: currentID,
        connectedID,
        hasCall,
        pictures,
        profiles,
    };
};

export default connect(mapStateToProps)(CallToast);