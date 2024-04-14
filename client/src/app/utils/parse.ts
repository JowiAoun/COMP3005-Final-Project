import {Member} from "@/entities/member";
import {tempMembers} from "@/app/utils/tempValues";

export const parseMemberInfo = (data: any): Member => {
  try {

    const { memberid, firstname, lastname, age, weight, height, bmi, caloriesburned, numofkm_ran, membershiptype, username, password } = data[0];

    const member: Member = {
      memberId: memberid,
      firstName: firstname,
      lastName: lastname,
      username: username,
      password: password,
      membershipType: membershiptype,
      healthStatistics: {
        caloriesBurned: caloriesburned,
        ran: numofkm_ran
      },
      healthMetrics: {
        age: new Date(age),
        weight: weight,
        height: height,
        bmi: bmi
      },
      routines: []
    };

    return member;
  } catch (error) {
    console.log(error)
    return tempMembers[0];
  }
}
