// This file simulates the Power BI Client API for testing without a live report
export const createMockReport = () => {
    return {
        getPages: async () => {
            console.log("[Mock] Fetching pages...");
            return [
                {
                    name: "Page1",
                    displayName: "Sales Overview",
                    isActive: true,
                    createVisual: async (type, layout) => {
                        console.log(`[Mock] Creating visual of type: ${type}`);
                        console.log(`[Mock] Layout:`, layout);
                        
                        // Return a mock visual object
                        return {
                            visual: {
                                name: `Visual_${Date.now()}`,
                                type: type,
                                title: "New Mock Visual",
                                addDataField: async (role, target) => {
                                    console.log(`[Mock] Adding data field to role '${role}':`, target);
                                    return true;
                                },
                                setProperty: async (selector, value) => {
                                    console.log(`[Mock] Setting property:`, selector, value);
                                }
                            }
                        };
                    }
                },
                {
                    name: "Page2",
                    displayName: "Details",
                    isActive: false
                }
            ];
        }
    };
};
