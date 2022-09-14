export const login = {
  namespaced: true,
  state: () => ({
    user: {
      avatar: null,
      contract: null,
      email: null,
      end_date: null,
      first_name: null,
      id: null,
      last_name: null,
      location: null,
      organisation_plans: [
        {
          active_amount: null,
          allowed_amount: null,
          id: null,
          remaining_amount: null,
        },
      ],
      organization_name: null,
      phone_number: null,
      primary_color: null,
      secondary_color: null,
      start_date: null,
      totalAllowedAmount:null,
      can_delete_users:null,
    },
    token: null,
    refreshToken: null,
    loggedIn: false,
  }),
}
