export const invitationCreateFormatter = (item) => {
  return {
    id: item?.preregistorId || 0,
    titleName: item?.titleName || '',
    firstname: item?.firstname || '',
    lastname: item?.lastname || '',
    companyName: item?.companyName || '',
    mobile: item?.mobile || '',
    email: item?.email || '',
    personTypeId: item?.personTypeId || 0,
    personName: item?.personName || '',
    areaZoneId: item?.areaZoneId,
    areaZoneName: item?.areaZoneName || '',
    objectiveWorkId: item?.objectiveWorkId,
    objectiveWorkName: item?.objectiveWorkName || '',
    detailPreregistor: item?.detailPreregistor || '',
    subareazoneid: item?.subareazoneid || '',
    subareazonename: item?.subareazonename || '',
    startDate: item?.startDate || '',
    expireDate: item?.expireDate || '',
    timeWorkId: item?.timeWorkId,
    peregistorTimeStart: item?.peregistorTimeStart || '',
    peregistorTimeEnd: item?.peregistorTimeEnd || '',
    shipPreregistorFollow: item?.shipPreregistorFollow || [],
    shipPreregistorMoc: item?.shipPreregistorMoc || [],
    shipStatusOperation: item?.shipStatusOperation || null,
    statusOperationId: item?.statusOperationId || null,
    statusVip: true,
  }
}
