export const preRegisterDetailFormatter = (item) => {
  return {
    accountId: item?.accountId || null,
    id: item?.preregistorId || 0,
    titleName: item?.titleName || '',
    firstname: item?.firstname || '',
    lastname: item?.lastname || '',
    citizenId: item?.citizenId || '',
    companyName: item?.companyName || '',
    companycode: item?.companycode || null,
    mobile: item?.mobile || '',
    email: item?.email || '',
    address: item?.address || '',
    positionName: item?.positionName || '',
    positioncode: item?.positioncode || '',
    personTypeId: item?.personTypeId || '',
    personName: item?.personName || '',
    startDate: item?.startDate || '',
    expireDate: item?.expireDate || '',
    timeWorkId: item?.timeWorkId,
    peregistorTimeStart: item?.peregistorTimeStart || '',
    peregistorTimeEnd: item?.peregistorTimeEnd || '',
    image: item?.image || '',
    trainingStatus: item?.trainingStatus || '',
    covidStatus: item?.covidStatus || '',
    shipPreregistorFollow: item?.shipPreregistorFollow || [],
    shipPreregistorMoc: item?.shipPreregistorMoc || [],
    shipStatusOperation: item?.shipStatusOperation || null,
    shipUserarea: item?.shipUserarea || [],
    accesstypepersonId: item?.accesstypepersonId || '',
    consentStatus: item?.consentStatus || false,
  }
}