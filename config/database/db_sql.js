/**
 * @returns sql
 * @rule <쿼리><테이블>_<기준>_<결과>
 */

// select
var selectShareGroupUser_share_count =
  "select count(*) as count from share_group_user where share=? and (true and (select exists (select * from share_group where share=?) as exist))";
  var selectSchedule_id_groups_day_all =
  "SELECT * FROM schedule WHERE (id=? OR share IN(SELECT share FROM share_group_user WHERE id=?)) AND ? BETWEEN DATE(start) AND DATE(end) ORDER BY start;";
  var selectSchedule_id_groups_week_all =
  "SELECT * FROM schedule WHERE (id=? OR share IN(SELECT share FROM share_group_user WHERE id=?)) AND YEARWEEK(start)=YEARWEEK(?) ORDER BY start;";
  var selectSchedule_id_groups_month_all =
  "select * from schedule where (id=? or share in(select share from share_group_user where id=?)) and start between date(?) and last_day(?) order by start;";
  var selectSchedule_group_all = "select * from schedule where share=? ;";
  
  var selectSchedule_number_all = "SELECT * FROM schedule WHERE number=?;";
  var selectSchedule_number_id_groups_all =
  "SELECT * FROM schedule WHERE number=? and (id=? or share in(SELECT share FROM share_group_user WHERE id=?));";
  var selectSchedule_number_id_all =
  "SELECT * FROM schedule WHERE number=? AND id=?;";
  var selectSchedule_id_all = "SELECT * FROM schedule WHERE id=? ORDER BY start;";
  var selectSchedule_idNumber_all =
  "SELECT * FROM schedule WHERE id=? AND number=? ;";
  var selectSchedule_dayMe_all =
  "SELECT * FROM schedule WHERE id=? AND start >= CURRENT_DATE && start < CURRENT_DATE+1 ORDER BY start;";
  var selectSchedule_weekMe_all =
  "SELECT * FROM schedule WHERE id=? AND YEARWEEK(start) = YEARWEEK(now()) ORDER BY start;";
  var selectSchedule_monthMe_all =
  "SELECT * FROM schedule WHERE id=? AND ( start > LAST_DAY(NOW() - interval 1 month) AND start <= LAST_DAY(NOW()) ) ORDER BY start;";
  var selectSchedule_endStart_count =
  "SELECT COUNT(*) as cnt FROM schedule WHERE start < ? AND end > ? AND id=?;";
  var selectUserImage_id_path = "SELECT path FROM user_image WHERE id=? ;";
  var selectShareGroupUser_id_all =
  "SELECT * FROM share_group WHERE share IN (SELECT share FROM share_group_user WHERE id=?) ;";
  var selectShareGroup_share_all = "SELECT * FROM share_group WHERE share=? ;";
  var selectSchedule_dayShare_all =
  "SELECT DISTINCT * FROM schedule WHERE (id=? OR share IN(?)) AND (start >= CURRENT_DATE && start < CURRENT_DATE+1) ORDER BY start;";
  var selectSchedule_weekShare_all =
  "SELECT DISTINCT * FROM schedule WHERE (id=? OR share IN(?)) AND (YEARWEEK(start) = YEARWEEK(now())) ORDER BY start ;";
  var selectSchedule_monthShare_all =
  "SELECT DISTINCT * FROM schedule WHERE (id=? OR share IN(?)) AND ( start > LAST_DAY(NOW() - interval 1 month) AND start <= LAST_DAY(NOW()) ) ORDER BY start ;";
  var selectSchedule_all_share_all =
  "SELECT DISTINCT * FROM schedule WHERE id=? OR share IN(select share from share_group_user where id=?) order by start ;";
  var selectShareGroupUser_share_id =
  "SELECT * FROM user WHERE id IN (SELECT id FROM share_group_user WHERE share=?);";
  var selectSchedule_share_all = "SELECT * FROM schedule WHERE share=? ;";
  var selectSchedule_user_id_all = "SELECT * FROM schedule WHERE id=? AND share IS NULL;";
  var selectShareGroupInvited_id_all =
  "select * from share_group_invited where id=? ;";
  var selectUser_id_exist =
    "select exists (select id from user where id=?) as exist;";
var selectUser_id_all = "select * from user where id=?;";
var selectUser_id_likeAll = "select id, name, path from user where id like ?;";
var selectUser_all_all = "select * from user;";
var selectUser_id_path = "select path from user where id=?;";
  
// insert
var insertUser_all_all = "INSERT INTO user SET ? ;";
var insertShareGroup_all_all =
  "INSERT INTO share_group (group_name, memo) VALUES (?, ?) ;SELECT LAST_INSERT_ID() ;";
var insertSchedule_all_all = "INSERT INTO schedule SET ? ;";
var insertShareGroupUser_all_all = "INSERT INTO share_group_user SET ? ;";
var insertShareGroupInvited_all_all =
  "insert into share_group_invited (id, share, group_name, inviter_name, inviter_id, memo) values ?;";

// update
var updateSchedule_id_share_shareNull =
  "update schedule set share=null where id=? and share=?;";
var updateUserBeInvited_id_beInvited =
  "UPDATE user_be_invited SET be_invited=? WHERE id=?;";
var updateSchedule_all_all =
  "UPDATE schedule SET schedule_name=?, location=?, start=?, end=?, alarm=?, share=?, memo=? WHERE number=?;";
var updateUser_path_id = "UPDATE user SET path=? WHERE id=? ;";
var updateUser_invite_id = "UPDATE user SET invite=? WHERE id=? ;";
// var updateUser_id_all = "UPDATE user SET name=?, password=? WHERE id=?";
// var updateUser_id_password = "UPDATE user SET name=?, password=? WHERE id=?";

// delete
var deleteSChedule_idNumber_all =
  "DELETE FROM schedule WHERE id=? AND number=?;";
var deleteUser_id_all = "DELETE FROM user WHERE id=?;";
var deleteShareGroupUser_idShare_all =
  "DELETE FROM share_group_user WHERE id=? AND share=? ;";
var deleteShareGroup_share_all = "DELETE FROM share_group WHERE share=? ;";
var deleteShareGroupInvited_share_all =
  "delete from share_group_invited where share=? and id=?;";

// exports
module.exports = {
  selectShareGroupInvited_id_all,
  selectSchedule_group_all,
  selectUser_id_exist,
  selectUser_id_all,
  selectUser_id_likeAll,
  selectUser_all_all,
  selectSchedule_id_all,
  selectSchedule_number_all,
  selectSchedule_number_id_all,
  selectSchedule_dayMe_all,
  selectSchedule_weekMe_all,
  selectSchedule_monthMe_all,
  selectSchedule_endStart_count,
  selectUserImage_id_path,
  selectShareGroupUser_id_all,
  selectShareGroupUser_share_count,
  selectShareGroup_share_all,
  selectSchedule_dayShare_all,
  selectSchedule_weekShare_all,
  selectSchedule_monthShare_all,
  selectSchedule_all_share_all,
  selectSchedule_idNumber_all,
  selectShareGroupUser_share_id,
  selectSchedule_share_all,
  selectSchedule_id_groups_day_all,
  selectSchedule_id_groups_week_all,
  selectSchedule_id_groups_month_all,
  selectSchedule_number_id_groups_all,
  selectSchedule_user_id_all,
  selectUser_id_path,
  insertShareGroupInvited_all_all,
  insertUser_all_all,
  insertShareGroup_all_all,
  insertSchedule_all_all,
  insertShareGroupUser_all_all,
  updateUserBeInvited_id_beInvited,
  updateSchedule_all_all,
  updateUser_path_id,
  updateUser_invite_id,
  updateSchedule_id_share_shareNull,
  deleteSChedule_idNumber_all,
  deleteUser_id_all,
  deleteShareGroupUser_idShare_all,
  deleteShareGroup_share_all,
  deleteShareGroupInvited_share_all
  //   updateUser_id_all,
  //   updateUser_id_password
};
