export default {
  data() {
    return {
      rules: {
        citizenId: [
          ...this.$Rules.require(
            this.$t('ShipPreregister.requireField.citizenId')
          ),
          ...this.$Rules.citizen('หมายเลขบัตรประชาชนหรือ Passport ไม่ถูกต้อง'),
        ],
        titleName: this.$Rules.require('กรุณาเลือกคำนำหน้า'),
        firstname: this.$Rules.require(
          this.$t('ShipPreregister.requireField.firstname')
        ),
        lastname: this.$Rules.require(
          this.$t('ShipPreregister.requireField.lastname')
        ),
        companyName: this.$Rules.require(
          this.$t('ShipPreregister.requireField.company')
        ),
        companycode: this.$Rules.require(
          this.$t('ShipPreregister.requireField.company')
        ),
        mobile: [
          ...this.$Rules.require(this.$t('ShipPreregister.requireField.phone')),
          ...this.$Rules.phone('กรุณากรอกข้อมูล 0-9'),
        ],
        email: [
          ...this.$Rules.email('รูปแบบ email ไม่ถูกต้อง'),
          ...this.$Rules.require('กรุณากรอก email'),
        ],
        address: [
          ...this.$Rules.require(
            this.$t('ShipPreregister.requireField.address')
          ),
          ...this.$Rules.maxLength(
            'จำนวนอักษรมีได้ไม่เกิน 10 ตัวอักษร',
            100,
            0
          ),
        ],
        positionName: this.$Rules.require(
          this.$t('ShipPreregister.requireField.position')
        ),
        personName: this.$Rules.require(
          this.$t('ShipPreregister.requireField.personalType')
        ),
        require: this.$Rules.require(
          this.$t('ShipPreregister.requireField.require')
        ),
        image: this.$Rules.image(this.$t('กรุณาอัพโหลดรูปภาพ')),
        areaZoneId: this.$Rules.require(
          this.$t('ShipPreregister.requireField.locationType'),
          'number'
        ),
        objectiveWorkId: this.$Rules.require(
          this.$t('ShipPreregister.requireField.purposeOfUseSpace'),
          'number'
        ),
        detailPreregistor: this.$Rules.require(
          this.$t('ShipPreregister.requireField.detailOfWork')
        ),
        peregistorTimeStart: this.$Rules.require(
          this.$t('ShipPreregister.requireField.time')
        ),
        peregistorTimeEnd: this.$Rules.require(
          this.$t('ShipPreregister.requireField.time')
        ),
        expireDate: this.$Rules.require(
          'กรุณาเลือกวันสิ้นสุดการปฏิบัติงาน',
          'date'
        ),
        startDate: this.$Rules.require('กรุณาเลือกวันเริ่มปฏิบัติงาน', 'date'),
        timeWorkId: this.$Rules.require(
          'กรุณาเลือกช่วงเวลาการเข้าปฏิบัติงาน',
          'number'
        ),
        zoneName: this.$Rules.require('กรุณาเลือกโซนพื้นที่เข้า'),
        plantId: this.$Rules.require('กรุณาเลือกเเพลนพื้นที่เข้า'),
        areaId: this.$Rules.require('กรุณาเลือกบริเวณพื้นที่เข้า'),
      },
    }
  },
}
