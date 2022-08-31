export const headerTableAreaZone = [
  {
    title: 'ลำดับ',
    dataIndex: 'order',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'order' },
  },
  {
    title: 'ชื่อภาษาไทย',
    dataIndex: 'nameTh',
    key: 'nameTh',
    width: '200px',
    scopedSlots: { customRender: 'nameTh' },
  },
  {
    title: 'ชื่อภาษาอังกฤษ',
    dataIndex: 'nameEn',
    key: 'nameEn',
    width: '200px',
    scopedSlots: { customRender: 'nameEn' },
  },
  {
    title: 'พื้นที่ย่อย',
    dataIndex: 'subArea',
    key: 'subArea',
    width: '200px',
    scopedSlots: { customRender: 'subArea' },
  },
  {
    title: 'สถานะ',
    dataIndex: 'status',
    key: 'status',
    width: '100px',
    align: 'center',
    scopedSlots: { customRender: 'status' },
  },
  {
    title: 'เเก้ไขพื้นที่',
    key: 'operation',
    width: '100px',
    align: 'center',
    scopedSlots: { customRender: 'operation' },
  },
  {
    title: 'เเก้ไขพื้นที่ย่อย',
    key: 'editSubArea',
    width: '130px',
    align: 'center',
    scopedSlots: { customRender: 'editSubArea' },
  },
]

export const headerTablePersonType = [
  {
    title: 'ลำดับ',
    dataIndex: 'order',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'order' },
  },
  {
    title: 'ประเภทบุคคล',
    dataIndex: 'nameTh',
    key: 'nameTh',
    width: '25%',
    scopedSlots: { customRender: 'nameTh' },
  },
  {
    title: 'ประเภทบุคคล (ภาษาอังกฤษ)',
    dataIndex: 'nameEn',
    key: 'nameEn',
    width: '25%',
    scopedSlots: { customRender: 'nameEn' },
  },
  {
    title: 'type',
    dataIndex: 'accesstypepersonnameTh',
    key: 'nameEn',
    width: '25%',
    scopedSlots: { customRender: 'accesstypepersonnameTh' },
  },
  {
    title: 'สถานะ',
    dataIndex: 'status',
    key: 'status',
    width: '100px',
    align: 'center',
    scopedSlots: { customRender: 'status' },
  },
  {
    title: 'เเก้ไข',
    key: 'action',
    width: '100px',
    align: 'center',
    scopedSlots: { customRender: 'operation' },
  },
]
export const headerTableObjectioveWorks = [
  {
    title: 'ลำดับ',
    dataIndex: 'order',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'order' },
  },
  {
    title: 'ชื่อภาษาไทย',
    dataIndex: 'nameTh',
    key: 'nameTh',
    width: '40%',
    scopedSlots: { customRender: 'nameTh' },
  },
  {
    title: 'ชื่อภาษาอังกฤษ',
    dataIndex: 'nameEn',
    key: 'nameEn',
    width: '40%',
    scopedSlots: { customRender: 'nameEn' },
  },
  {
    title: 'สถานะ',
    dataIndex: 'status',
    key: 'status',
    width: '100px',
    align: 'center',
    scopedSlots: { customRender: 'status' },
  },
  {
    title: 'เเก้ไข',
    key: 'action',
    width: '100px',
    align: 'center',
    scopedSlots: { customRender: 'operation' },
  },
]
export const headerTableTimeWorks = [
  {
    title: 'ลำดับ',
    dataIndex: 'order',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'order' },
  },
  {
    title: 'เวลาเริ่มต้น',
    dataIndex: 'timeStart',
    key: 'timeStart',
    width: '40%',
    scopedSlots: { customRender: 'timeStart' },
  },
  {
    title: 'เวลาสุดท้าย',
    dataIndex: 'timeEnd',
    key: 'timeEnd',
    width: '40%',
    scopedSlots: { customRender: 'timeEnd' },
  },
  {
    title: 'สถานะ',
    dataIndex: 'status',
    key: 'status',
    width: '100px',
    align: 'center',
    scopedSlots: { customRender: 'status' },
  },
  {
    title: 'เเก้ไข',
    key: 'action',
    width: '100px',
    align: 'center',
    scopedSlots: { customRender: 'operation' },
  },
]

export const headerTableRequireFields = [
  {
    title: 'ลำดับ',
    dataIndex: 'order',
    align: 'center',
    width: '80px',
    scopedSlots: { customRender: 'order' },
  },
  {
    title: 'Require field',
    dataIndex: 'nameTh',
    key: 'nameTh',
    scopedSlots: { customRender: 'nameTh' },
  },
  {
    title: 'สถานะ',
    dataIndex: 'status',
    key: 'status',
    width: '100px',
    align: 'center',
    scopedSlots: { customRender: 'status' },
  },
]
export const headerTableCovids = [
  {
    title: 'COVID-19 Management',
    dataIndex: 'nameTh',
    key: 'nameTh',
    scopedSlots: { customRender: 'nameTh' },
  },
  {
    title: 'สถานะ',
    dataIndex: 'status',
    key: 'status',
    width: '100px',
    align: 'center',
    scopedSlots: { customRender: 'status' },
  },
]
