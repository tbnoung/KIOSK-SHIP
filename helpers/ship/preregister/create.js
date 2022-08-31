export const preRegisterCreateFormatter = (item) => {
  return {
    accountId: item?.accountId || null,
    id: item?.preregistorId || 0,
    citizenId: item?.citizenId || '',
    personTypeId: item?.personTypeId || '',
    personName: item?.personName || '',
    statusPrivacyNotice: item?.statusPrivacyNotice || false,
    accesstypepersonId: item?.accesstypepersonId || '',
    shipPreregistorFollow: item?.shipPreregistorFollow || [],
    shipPreregistorMoc: item?.shipPreregistorMoc || [],
    shipUserarea: item?.shipUserarea || [],
    shipStatusOperation: item?.shipStatusOperation || '',
  }
}
