class ColumnModel {

	setEndTime(endtime) {
		this.endtime = endtime;
	}
	getEndTime() {
		return this.endtime;
	}
	setOwner(owner) {
    this.owner = owner;
	}
	getOwner() {
		return this.owner;
	}
	setStartTime(starttime) {
		this.starttime = starttime;
	}
	getStartTime() {
		return this.starttime;
	}
	setService(service) {
		return this.service = service;
	}
	getService() {
		return this.service;
	}
	setTableName(table_name) {
    this.table_name = table_name;
	}
	getTableName() {
		return this.table_name;
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
module.exports = ColumnModel;