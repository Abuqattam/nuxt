// const Local = 'http://192.168.100.86:8055'
const Stage = 'http://207.148.69.39:8055'
// const published = 'filter[Status][_eq]=Published'
const BaseUrl = `${Stage}`
const API = {
  localFiles: `${BaseUrl}/assets/`,
  Authenticateion: {
    Login: `${BaseUrl}/auth/login`,
    Register: `${BaseUrl}/users`,
    Refresh: `${BaseUrl}/auth/refresh`,
    LoggedUser: `${BaseUrl}/users/me?fields=*,organisation_plans.*`,
    UpdateMyUser: `${BaseUrl}/users/me?`,
    requestPassword: `${BaseUrl}/auth/password/request`,
  },
  imageSlider: {
    GetAll: `${BaseUrl}/items/image_slider`,
  },
  homePage: {
    GetAboutUs: `${BaseUrl}/items/about_us`,
    GetPartnersPage: `${BaseUrl}/items/home_partners_section?fields=*,partners.*`,
    GetStorePage:`${BaseUrl}/items/home_store_download_section`
  },
  footer: {
    GetFooterData: `${BaseUrl}/items/footer`,
  },
  users: {
    GetUsers: `${BaseUrl}/items/businesses_users?fields=*,plan.name,plan.id,plan.arabic_name&limit=10&page={page}&meta=filter_count`,
    GetUsersCount: `${BaseUrl}/items/businesses_users?aggregate[count]=id`,
    GetUsersTotalSavings: `${BaseUrl}/items/businesses_users?aggregate[sum]=total_savings`,
    GetUsersTotalCoupons: `${BaseUrl}/items/businesses_users?aggregate[sum]=coupons_redeemed`,
    GetSingleUser: `${BaseUrl}/items/businesses_users/{id}`,
    PatchUser: `${BaseUrl}/items/businesses_users/{id}`,
    AddUser: `${BaseUrl}/items/businesses_users`,
  },
  plans:{
    OrganisationPlans: `${BaseUrl}/items/junction_directus_users_plans?fields=*`,
    UpdateOrganisationPlans: `${BaseUrl}/items/junction_directus_users_plans/{id}`,
    GetPlans: `${BaseUrl}/items/plans?fields=name`,
    GetSingPlan: `${BaseUrl}/items/plans/{id}?fields=name,id,arabic_name`,
  },
  contactUs:{
    postRecord: `${BaseUrl}/items/contact_us_form`
  },
  privacyPolicy:{
    GetAll: `${BaseUrl}/items/privacy_policy`
  },
  termsAndCondition:{
    GetAll: `${BaseUrl}/items/terms_and_conditions`
  }


}

export default API
