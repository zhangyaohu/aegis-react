class UsersModel {
  setId(id) {
     this.id = id;
	}
	getId() {
    return this.id;
	}
	setUserName(user_name) {
		this.user_name = user_name;
	}
	getUserName() {
		return this.user_name;
	}
	setEndTime(endtime) {
    this.endtime = endtime;
	}
	getEndTime() {
		return this.endtime;
	}
	setStartTime(starttime) {
		this.starttime = starttime;
	}
	getStartTime() {
		return this.starttime;
	}
	setSname(sname) {
		return this.sname = sname;
	}
	getSname() {
		return this.sname;
	}
	setHostname(hostname) {
    return this.hostname = hostname;
	}
	getHostName () {
		return this.hostname;
	}
	setDirection(direction) {
		this.direction = direction;
	}
	getDirection() {
		return this.direction;
	}
	setOrderBy(orderBy) {
		this.orderBy = orderBy;
	}
	getOrderBy() {
		return this.orderBy;
	}
	setStart(start) {
		this.start = start;
	}
	getStart() {
		return this.start;
	}
	setLimit(limit) {
		this.limit = limit;
	}
	getLimit() {
		return this.limit;
	}
}
module.exports = UsersModel;