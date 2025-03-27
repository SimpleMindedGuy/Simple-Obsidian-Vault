// In The Name of Allah, The Most Beneficent, The Most Merciful
/**
 * Get the prayer times based on provided {@link prayerDate} and location {@link Country}, {@link City}
 * using  the aladhan.com's api.
 * prints tasks for each prayer 
 * each task will contain a format that is compatible with obsidian-tasks and obsidian-reminder plugins.
 * @date 19/07/2024 - 14:44
 * @param {String} prayerDate  date has to be in the format DD-MM-YYYY
 * @param {String} City City
 * @param {String} Country Country
 * @async
 * @returns {Promise<Object[]|null>}
 */
async function GetPrayerTasks(prayerDate, Country, City) {
  // Getting Templater object for running functions
  let tp = await window?.pkvs?.load("tp");

  const taskNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]
  const reminderNames = ["Imsak", "Midnight", "Firstthird", "Lastthird"]



  if (!tp) {
    console.log(`08-Data-Fetching: GetPrayerTasks:\nGlobal key for templater not found or empty: \nattempting to get templater object obsidian plugins`);

    // Getting Templater object for running functions
    tp = {}
    const tpInternalFunctions = await app.plugins.getPlugin('templater-obsidian').templater.functions_generator.internal_functions.modules_array

    for (const fun of tpInternalFunctions) {
      tp[fun.name] = fun.static_object;
    }

    tp['user'] = await app.plugins.getPlugin('templater-obsidian').templater.functions_generator.user_functions.user_script_functions.generate_object();


  }

  // If templater is not provided exist loop
  if (!tp) {
    console.warn(`08-Data-Fetching: GetPrayerTasks:\ntemplater is not provided`)
    console.warn(tp)
    return
  }


  const apiDate = moment(`${prayerDate}`).format("DD-MM-YYYY")
  console.log(`city`, City, `\ncountry`, Country);
  const timings = await fetch(`http://api.aladhan.com/v1/timingsByCity/${apiDate}?city=${City}&country=${Country}&method=4`).then(
    async (response) => {

      if (!response) {
        console.log("08-Data-Fetching: GetPrayerTasks:\nsomething went wrong");
        return null
      }

      const resJson = await response.json();

      if (!resJson) {
        console.log("08-Data-Fetching: GetPrayerTasks:\ndata is empty")
        return null
      }

      if (resJson.code !== 200) {
        console.log("08-Data-Fetching: GetPrayerTasks:\nrequest error")
      }
      return resJson.data.timings;
    }
  );


  let tasks = ""
  let reminders = ""

  if (!timings) {
    console.log("08-Data-Fetching: GetPrayerTasks:\ntiming data is empty");
  }

  /// looping over  key and values pairs
  /// key is prayer Name
  // the value is the prayer time.
  for (const [PrayerName, PrayerTime] of Object.entries(timings)) {

    const startTime = moment(PrayerTime, ["HH:mm:ss", "HH:mm", "hh:mm A", "hh:mm a"]).add(0, 'minutes').format("hh:mm A");
    const endTime = moment(startTime, ["HH:mm:ss", "HH:mm", "hh:mm A", "hh:mm a"]).add(15, 'minutes').format("hh:mm A");

    if (taskNames.includes(PrayerName)) {
      tasks += `\n- [ ] ${PrayerName} prayer [timeStamp:: ${startTime}-${endTime}] [priority:: high]  [due:: ${prayerDate}]`
    }



    // tasks += `\n- [ ] ${startTime} - ${endTime} ${key} prayer ⏰ ${prayerDate} ${value} ⏫ 📅 ${prayerDate}`
    // if (reminderNames.includes(key)) {
    //   reminders = `\n- ${key} ⏰ ${prayerDate} ${value} ⏫ 📅 ${prayerDate}`
    // }

  }

  const final = tasks + reminders;

  return final;
}
module.exports = GetPrayerTasks
