export const preRegisterConsentFormatter = (item) => {
  return {
    accountId: item?.accountId || null,
    address: item?.address,
    citizenId: item?.citizenId,
    covidStatus: item?.covidStatus,
    email: item?.email,
    titleName: item?.titleName || '',
    firstname: item?.firstname,
    image: item?.image,
    lastname: item?.lastname,
    company: item?.company || '',
    companyName: item?.companyName || '',
    positionName: item?.positionName || '',
    mobile: item?.mobile,
    personName: item?.personName,
    personTypeId: item?.personTypeId,
    position: item?.position,
    preregistorId: item?.preregistorId,
    preRegistorIdFollow: item?.preRegistorIdFollow,
    statusOperationId: item?.statusOperationId,
    startDate: item?.startDate || '',
    expireDate: item?.expireDate || '',
    timeWorkId: item?.timeWorkId,
    peregistorTimeStart: item?.peregistorTimeStart || '',
    peregistorTimeEnd: item?.peregistorTimeEnd || '',
    trainingStatus: item?.trainingStatus,
    licenseName: item?.licenseName,
    qrCode: item?.qrCode,
    type: 'master',
  }
}
