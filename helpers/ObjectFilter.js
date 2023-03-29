module.exports = function ObjectFilter(object) {
  if (object) {
    delete object.id;
    delete object.UserId;
    delete object.CreatorId;
    delete object.createdAt;
    delete object.updatedAt;
    delete object.deletedAt;
    delete object.AccessCompaniesId;
    delete object.level;
  }
  return object;
};
