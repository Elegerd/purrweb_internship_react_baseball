import request from "../request";

export function leaderBoardBattingRequest(data) {
  return request
    .post("api/v1/graphql", {
      query: `
      query LeaderboardBatting($input:FilterLeaderboardInput!) {
        leaderboard_batting(input: $input) {
          leaderboard_batting {
            batter_name
            exit_velocity
            launch_angle
            distance
            batter_datraks_id
            age
            school {
              id
              name
            }
            teams {
              id
              name
            }
            favorite
          }
        }
      }
    `,
      variables: { input: data },
    })
    .then(({ data }) => data);
}

export function leaderBoardPitchingRequest(data) {
  return request
    .post("api/v1/graphql", {
      query: `
      query LeaderboardPitching($input:FilterLeaderboardInput!) {
        leaderboard_pitching(input: $input) {
          leaderboard_pitching {
            pitcher_name
            pitch_type
            velocity
            spin_rate
            vertical_break
            horizontal_break
            pitcher_datraks_id
            age
            school {
              id
              name
            }
            teams {
              id
              name
            }
            favorite
          }
        }
      }
    `,
      variables: { input: data },
    })
    .then(({ data }) => data);
}

export function notificationRequest({ count, offset }) {
  return request
    .post("api/v1/graphql", {
      query: `
      query Notifications($input:FilterNotificationsInput!) {
        notifications(input: $input) {
          notifications {
            id
            description
            link
          }
        }
      }  
    `,
      variables: { input: { count, offset } },
    })
    .then(({ data }) => data);
}

export function facilitiesRequest({ search = "" }) {
  return request
    .post("api/v1/graphql", {
      query: `
      query Facilities($search:String!) {
        facilities(search: $search) {
          facilities {
            id
            email
            u_name
          }
        }
      }
    `,
      variables: { search },
    })
    .then(
      ({
        data: {
          data: {
            facilities: { facilities },
          },
        },
      }) => facilities
    );
}

export function schoolsRequest({ search = "" }) {
  return request
    .post("api/v1/graphql", {
      query: `
      query Schools($search:String!) {
        schools(search: $search) {
          schools {
            id
            name
          }
        }
      }
    `,
      variables: { search },
    })
    .then(
      ({
        data: {
          data: {
            schools: { schools },
          },
        },
      }) => schools
    );
}

export function teamsRequest({ search = "" }) {
  return request
    .post("api/v1/graphql", {
      query: `
      query Teams($search:String!) {
        teams(search: $search) {
          teams {
            id
            name
          }
        }
      }
    `,
      variables: { search },
    })
    .then(
      ({
        data: {
          data: {
            teams: { teams },
          },
        },
      }) => teams
    );
}

export function profileEventsRequest(data) {
  return request
    .post("api/v1/graphql", {
      query: `
      query ProfileEvents($input:FilterProfileEventsInput!) {
        profile_events(input: $input) {
          events {
            id
            date
            event_type
            event_name
          }
          total_count
        }
      }
    `,
      variables: { input: data },
    })
    .then(
      ({
        data: {
          data: { profile_events },
        },
      }) => profile_events
    );
}
