document.addEventListener('DOMContentLoaded', function() {
    const accessToken = 'qRDbnZxed0lEJcFIfN68sL-5USvxi8llV4r5ZHnJlQE';
    const apiUrl = 'https://mastodon.social/api/v1/accounts/112187046117664318/statuses?limit=1';
    const profileApiUrl = 'https://mastodon.social/api/v1/accounts/112187046117664318';

       // Function to update the profile picture
    function updateProfilePicture() {
        fetch(profileApiUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Profile API request failed: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const profileImageUrl = `${data.avatar_static}?${new Date().getTime()}`;
            document.getElementById('header-profile-pic').src = profileImageUrl;
        })
        .catch(error => {
            console.error('Error fetching Mastodon profile:', error);
        });
    }

    // Function to update the latest status
    function updateLatestStatus() {
        fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Status API request failed: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                const latestStatus = data[0];
                const content = latestStatus.content;
                const createdAt = new Date(latestStatus.created_at).toLocaleString();
                const postUrl = latestStatus.url;
                const client = latestStatus.application ? latestStatus.application.name : 'Unknown client';
                const profileImageUrl = latestStatus.account.avatar_static;
                const displayName = latestStatus.account.display_name;
                const username = latestStatus.account.acct;

                // Check if there are any media attachments
                let mediaHtml = '';
                if (latestStatus.media_attachments.length > 0) {
                    const mediaUrl = latestStatus.media_attachments[0].preview_url;
                    mediaHtml = `<img src="${mediaUrl}" alt="Attached Image" class="status-image">`;
                }

                const statusHtml = `
                    <a href="${postUrl}" target="_blank">
                        <div class="mastodon-profile">
                            <img src="${profileImageUrl}?${new Date().getTime()}" alt="Profile Picture">
                            <div>
                                <span class="display-name">${displayName}</span>
                                <span>@${username}</span>
                            </div>
                        </div>
                        <div class="mastodon-content">
                            ${content}
                            ${mediaHtml}
                        </div>
                        <div style="margin-top: 10px; font-size: 0.9em; color: #ccc;">
                            Posted on ${createdAt} from ${client}
                        </div>
                    </a>
                `;

                document.getElementById('mastodon-status').innerHTML = statusHtml;
            } else {
                document.getElementById('mastodon-status').innerHTML = 'No status found.';
            }
        })
        .catch(error => {
            console.error('Error fetching Mastodon status:', error);
            document.getElementById('mastodon-status').innerHTML = 'Failed to load status.';
        });
    }

    // Update profile picture and latest status
    updateProfilePicture();
    updateLatestStatus();
});