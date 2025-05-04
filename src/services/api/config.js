// API base URL for all microservices
const BASE_URL =
  "https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina";

// Service-specific base URLs
const BASE_URLS = {
  login: `${BASE_URL}/v1.0`,
  maintenance: `${BASE_URL}/maintenance-f9f/v1.0`,
  asset: `${BASE_URL}/asset-e99/v1.0`,
  user: `${BASE_URL}/user-294/v1.0`,
  assetRequest: `${BASE_URL}/assetrequest-9fc/v1.0`,
  calendar: `${BASE_URL}/calander-7e9/v1.0`,
  mealtime: `${BASE_URL}/mealtime-481/v1.0`,
  mealtype: `${BASE_URL}/mealtype-899/v1.0`,
  settings: `${BASE_URL}/settings-e6f/v1.0`,
  dashboardAdmin: `${BASE_URL}/dashboard-admin-b74/v1.0`,
  dashboardUser: `${BASE_URL}/dashboard-user-033/v1.0`,

    // For local development
//   login: "http://localhost:9090/auth",
//   maintenance: "http://localhost:9090/maintenance",
//   asset: "http://localhost:9090/asset",
//   user: "http://localhost:9090/user",
//   assetRequest: "http://localhost:9090/assetrequest",
//   calendar: "http://localhost:9090/calendar",
//   mealtime: "http://localhost:9090/mealtime",
//   mealtype: "http://localhost:9090/mealtype",
//   settings: "http://localhost:9090/settings",
//   dashboardAdmin: "http://localhost:9090/dashboard/admin",
//   dashboardUser: "http://localhost:9090/dashboard/user",
};

export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${BASE_URLS.login}/login`,

  // User Management
  USER_ADD: `${BASE_URLS.user}/add`,
  USER_DETAILS: `${BASE_URLS.user}/details`,
  USER_DETAILS_BY_ID: (userId) => `${BASE_URLS.user}/details/${userId}`,

  // Maintenance
  MAINTENANCE_ADD: `${BASE_URLS.maintenance}/add`,
  MAINTENANCE_ADD_NOTIFICATION: `${BASE_URLS.maintenance}/addnotification`,
  MAINTENANCE_DETAILS: `${BASE_URLS.maintenance}/details`,
  MAINTENANCE_DETAILS_BY_ID: (id) => `${BASE_URLS.maintenance}/details/${id}`,
  MAINTENANCE_NOTIFICATION: `${BASE_URLS.maintenance}/notification`,
  MAINTENANCE_REPORT: `${BASE_URLS.maintenance}/report`,

  // Asset Management
  ASSET_ADD: `${BASE_URLS.asset}/add`,
  ASSET_DETAILS: `${BASE_URLS.asset}/details`,
  ASSET_DETAILS_BY_ID: (id) => `${BASE_URLS.asset}/details/${id}`,

  // Asset Requests
  ASSET_REQUEST_ADD: `${BASE_URLS.assetRequest}/add`,
  ASSET_REQUEST_DETAILS: `${BASE_URLS.assetRequest}/details`,
  ASSET_REQUEST_DETAILS_BY_USER: (userId) =>
    `${BASE_URLS.assetRequest}/details/${userId}`,
  ASSET_REQUEST_DUE_ASSETS: `${BASE_URLS.assetRequest}/dueassets`,
  ASSET_REQUEST_DUE_ASSETS_BY_USER: (userId) =>
    `${BASE_URLS.assetRequest}/dueassets/${userId}`,

  // Calendar & Meal Events
  CALENDAR_MEAL_EVENTS: `${BASE_URLS.calendar}/mealevents`,
  CALENDAR_MEAL_EVENTS_BY_USER: (userId) =>
    `${BASE_URLS.calendar}/mealevents/${userId}`,
  CALENDAR_MEAL_EVENTS_ADD: `${BASE_URLS.calendar}/mealevents/add`,
  CALENDAR_MEAL_EVENTS_DELETE: (eventId) =>
    `${BASE_URLS.calendar}/mealevents/${eventId}`,

  // Meal Time Management
  MEAL_TIME_ADD: `${BASE_URLS.mealtime}/add`,
  MEAL_TIME_DETAILS: `${BASE_URLS.mealtime}/details`,
  MEAL_TIME_DELETE: (mealId) => `${BASE_URLS.mealtime}/details/${mealId}`,
  MEAL_TIME_UPDATE: (mealId) => `${BASE_URLS.mealtime}/details/${mealId}`,

  // Meal Type Management
  MEAL_TYPE_ADD: `${BASE_URLS.mealtype}/add`,
  MEAL_TYPE_DETAILS: `${BASE_URLS.mealtype}/details`,
  MEAL_TYPE_DELETE: (mealId) => `${BASE_URLS.mealtype}/details/${mealId}`,
  MEAL_TYPE_UPDATE: (mealId) => `${BASE_URLS.mealtype}/details/${mealId}`,

  // User Settings
  SETTINGS_DETAILS: (userId) => `${BASE_URLS.settings}/details/${userId}`,
  SETTINGS_UPDATE: (endpoint, userId) =>
    `${BASE_URLS.settings}/${endpoint}/${userId}`,
  SETTINGS_PASSWORD_UPDATE: (userId) =>
    `${BASE_URLS.settings}/password/${userId}`,
  SETTINGS_PROFILE_UPDATE: (userId) =>
    `${BASE_URLS.settings}/profile/${userId}`,

  // Admin Dashboard
  ADMIN_DASHBOARD_STATS: `${BASE_URLS.dashboardAdmin}/stats`,
  ADMIN_DASHBOARD_RESOURCES: `${BASE_URLS.dashboardAdmin}/resources`,
  ADMIN_DASHBOARD_MEAL_DISTRIBUTION: `${BASE_URLS.dashboardAdmin}/mealdistribution`,
  ADMIN_DASHBOARD_RESOURCE_ALLOCATION: `${BASE_URLS.dashboardAdmin}/resourceallocation`,

  // User Dashboard
  USER_DASHBOARD_STATS: (userId) =>
    `${BASE_URLS.dashboardUser}/stats/${userId}`,
  USER_DASHBOARD_ACTIVITIES: (userId) =>
    `${BASE_URLS.dashboardUser}/activities/${userId}`,
};
