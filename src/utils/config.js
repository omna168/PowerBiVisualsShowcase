export const getEmbedConfig = async () => {
    const endpoint = "https://aka.ms/QuickVisualCreatorReportEmbedConfig";
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return {
            type: 'report',
            id: data.Id,
            embedUrl: data.EmbedUrl,
            accessToken: data.EmbedToken.Token,
            tokenType: 1, // models.TokenType.Embed
            settings: {
                panes: {
                    filters: {
                        visible: false
                    },
                    pageNavigation: {
                        visible: false
                    }
                }
            }
        };
    } catch (error) {
        console.warn("Auto-fetch of embed config failed (expected if endpoint is down or CORS blocked). Falling back to manual/mock mode.");
        return null;
    }
};
