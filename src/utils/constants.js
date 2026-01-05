// Define the available data roles for the visual types
export const visualTypeToDataRoles = [
    { name: "columnChart", displayName: "Column chart", dataRoles: ["X-axis", "Y-axis", "Tooltips"], dataRoleNames: ["Category", "Y", "Tooltips"] },
    { name: "areaChart", displayName: "Area chart", dataRoles: ["X-axis", "Legend", "Y-axis"], dataRoleNames: ["Category", "Series", "Y"] },
    { name: "barChart", displayName: "Bar chart", dataRoles: ["Y-axis", "X-axis", "Tooltips"], dataRoleNames: ["Category", "Y", "Tooltips"] },
    { name: "pieChart", displayName: "Pie chart", dataRoles: ["Legend", "Values", "Tooltips"], dataRoleNames: ["Category", "Y", "Tooltips"] },
    { name: "lineChart", displayName: "Line chart", dataRoles: ["X-axis", "Legend", "Y-axis"], dataRoleNames: ["Category", "Series", "Y"] },
];

// Define the available fields for each data role
export const dataRolesToFields = [
    { dataRole: "X-axis", Fields: ["Industry", "Opportunity Status", "Lead Rating", "Salesperson"] },
    { dataRole: "Y-axis", Fields: ["Actual Revenue", "Estimated Revenue", "Number of Opportunities", "Salesperson"] },
    { dataRole: "Axis", Fields: ["Industry", "Opportunity Status", "Lead Rating", "Salesperson"] },
    { dataRole: "Values", Fields: ["Actual Revenue", "Estimated Revenue", "Number of Opportunities", "Salesperson"] },
    { dataRole: "Legend", Fields: ["Industry", "Lead Rating", "Opportunity Status", "Salesperson"] },
    { dataRole: "Tooltips", Fields: ["Industry", "Actual Close Date", "Actual Revenue", "Estimated Revenue"] },
];

// Define schemas for visuals API
export const schemas = {
    column: "http://powerbi.com/product/schema#column",
    measure: "http://powerbi.com/product/schema#measure",
    property: "http://powerbi.com/product/schema#property",
    default: "http://powerbi.com/product/schema#default",
};

// Define mapping from fields to target table and column/measure
export const dataFieldsTargets = {
    ActualRevenue: { column: "Actual Revenue", table: "QVC Report", schema: schemas.column },
    NumberofOpportunities: { measure: "Number of Opportunities", table: "QVC Report", schema: schemas.measure },
    Salesperson: { column: "Salesperson", table: "QVC Report", schema: schemas.column },
    EstimatedRevenue: { column: "Estimated Revenue", table: "QVC Report", schema: schemas.column },
    OpportunityStatus: { column: "Opportunity Status", table: "QVC Report", schema: schemas.column },
    Industry: { column: "Industry", table: "QVC Report", schema: schemas.column },
    LeadRating: { column: "Lead Rating", table: "QVC Report", schema: schemas.column },
    ActualCloseDate: { column: "Actual Close Date", table: "QVC Report", schema: schemas.column },
};

export const dataFieldsMappings = {
    ActualRevenue: "Actual Revenue",
    NumberofOpportunities: "Number of Opportunities",
    Salesperson: "Salesperson",
    EstimatedRevenue: "Estimated Revenue",
    OpportunityStatus: "Opportunity Status",
    Industry: "Industry",
    LeadRating: "Lead Rating",
    ActualCloseDate: "Actual Close Date"
};
