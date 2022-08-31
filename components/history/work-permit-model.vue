<template>
  <div class="p-4">
    <a-modal
      :visible="visible"
      centered
      :closable="false"
      :mask-closable="false"
      :confirm-loading="isConfirmLoading"
      :width="1000"
      class="overflow-modal"
    >
      <template slot="footer">
        <a-button type="primary" @click="$emit('cancel', updated)">
          ปิดหน้านี้
        </a-button>
      </template>
      <a-spin :spinning="isConfirmLoading">
        <div class="flex fix-content-modal">
          <div>
            <font-awesome-icon :icon="['fad', 'info-circle']" class="text-lg" />
          </div>
          <div class="flex-1 max-w-full">
            <div class="mb-3 text-xl font-bold">
              {{ $t('history.work_permit.title') }}
            </div>
            <a-card :title="titleCard">
              <a-card :title="$t('history.work_permit.approve_infomation')">
                <a-descriptions
                  :title="$t('history.work_permit.user_information')"
                  layout="vertical"
                >
                  <a-descriptions-item
                    :label="$t('history.work_permit.fullname')"
                  >
                    {{ data ? data.firstname : '' }}
                    {{ data ? data.lastname : '' }}
                  </a-descriptions-item>
                  <a-descriptions-item
                    :label="$t('history.work_permit.citizenId')"
                  >
                    {{ data ? data.citizenId : '' }}
                  </a-descriptions-item>
                  <a-descriptions-item :label="$t('history.work_permit.email')">
                    {{ data ? data.email : '' }}
                  </a-descriptions-item>
                  <a-descriptions-item
                    :label="$t('history.work_permit.mobile')"
                  >
                    {{ data ? data.mobile : '' }}
                  </a-descriptions-item>
                  <a-descriptions-item
                    :label="$t('history.work_permit.company')"
                  >
                    {{ data ? data.company : '' }}
                  </a-descriptions-item>
                  <a-descriptions-item
                    :label="$t('history.work_permit.remark')"
                  >
                    -
                  </a-descriptions-item>
                </a-descriptions>
              </a-card>
              <a-card :title="$t('history.work_permit.working_infomation')">
                <a-descriptions>
                  <a-descriptions-item
                    :label="$t('history.work_permit.project')"
                  >
                    {{ data ? data.projectName : '' }}
                  </a-descriptions-item>
                  <a-descriptions-item
                    span="2"
                    :label="$t('history.work_permit.description')"
                  >
                    {{ data ? data.description : '' }}
                  </a-descriptions-item>
                  <a-descriptions-item
                    :label="$t('history.work_permit.server_room')"
                  >
                    {{ serverRoomName }}
                  </a-descriptions-item>
                  <a-descriptions-item :label="$t('history.work_permit.date')">
                    {{
                      data ? $moment(data.workingDate).format('DD/MM/YYYY') : ''
                    }}
                  </a-descriptions-item>
                  <a-descriptions-item :label="$t('history.work_permit.time')">
                    {{
                      data
                        ? data.timeFrom == data.timeTo
                          ? data.timeFrom
                          : data.timeFrom + ' ' + data.timeTo
                        : ''
                    }}
                  </a-descriptions-item>
                  <a-descriptions-item
                    :label="$t('history.work_permit.agency')"
                  >
                    {{ data ? data.agency : '' }}
                  </a-descriptions-item>
                  <a-descriptions-item
                    :label="$t('history.work_permit.rack_no')"
                  >
                    {{ data ? data.rackNo : '' }}
                  </a-descriptions-item>
                  <a-descriptions-item
                    :label="$t('history.work_permit.manager')"
                  >
                    {{ managerName }}
                  </a-descriptions-item>
                </a-descriptions>
              </a-card>
              <a-card title="ข้อมูลการอนุมัติ">
                <a-row :gutter="16">
                  <a-col :md="{ span: 12 }" :lg="{ span: 12 }">
                    <div v-if="user.roleId == 0 || user.roleId == 9">
                      <a-card
                        :title="$t('history.work_permit.manager_approve')"
                        :bordered="true"
                        class="h-full"
                      >
                        <!-- <div
                        v-if="
                          data
                            ? !data.managerApproved &&
                              data.managerApprovedDate === null &&
                              !data.ocioManagerApproved &&
                              data.ocioManagerApprovedDate === null &&
                              data.managerId !== managerId
                              ? true
                              : false
                            : false
                        "
                      >
                        <a-avatar
                          size="large"
                          icon="user"
                          :style="{
                            backgroundColor: 'orange',
                            verticalAlign: 'middle',
                          }"
                          class="mr-2"
                        />
                        <a-tag color="orange" class="text-sm">
                          รอ ผู้ดูแลโครงการ อนุมัติเข้าปฏิบัติงาน
                        </a-tag>
                      </div> -->
                        <!-- <div
                        v-if="
                          (data
                            ? !data.managerApproved &&
                              data.managerApprovedDate === null &&
                              !data.ocioManagerApproved
                              ? true
                              : false
                            : false) || isEdit
                        "
                      > -->
                        <div
                          v-if="
                            (data
                              ? !data.managerApproved &&
                                data.managerApprovedDate === null &&
                                !data.ocioManagerApproved
                                ? true
                                : false
                              : false) || isEdit
                          "
                        >
                          <a-textarea
                            v-model="formApprove.remark"
                            :placeholder="$t('history.work_permit.fill_remark')"
                            :rows="2"
                            class="mb-4"
                          />
                          <a-button
                            type="primary"
                            icon="check-circle"
                            @click="Approve(true, true)"
                          >
                            อนุมัติ
                          </a-button>
                          <a-button
                            type="danger"
                            icon="close-circle"
                            @click="Approve(false, true)"
                          >
                            ไม่อนุมัติ
                          </a-button>
                        </div>
                        <div
                          v-else-if="
                            data
                              ? data.managerApproved &&
                                data.managerApprovedDate !== null
                                ? true
                                : false
                              : false
                          "
                        >
                          <a-avatar
                            size="large"
                            icon="check"
                            :style="{
                              backgroundColor: '#87d068',
                              verticalAlign: 'middle',
                            }"
                          />
                          <a-tag color="green" class="sm:text-sm">
                            ผู้ดูแลโครงการอนุมัติเรียบร้อยแล้ว
                          </a-tag>
                          <p class="mt-2 text-black">
                            รายละเอียดเพิ่มเติม :
                            {{ data ? data.managerRemark : '-' }}
                          </p>
                          <p class="mt-2 text-black">
                            วันที่อนุมัติ :
                            {{
                              data && data.managerApprovedDate
                                ? $moment(data.managerApprovedDate).format(
                                    'DD/MM/YYYY HH:mm'
                                  )
                                : '-'
                            }}
                          </p>
                        </div>
                        <div v-else>
                          <a-avatar
                            size="large"
                            icon="close"
                            :style="{
                              backgroundColor: '#f50',
                              verticalAlign: 'middle',
                            }"
                          />
                          <a-tag color="#f50" class="sm:text-sm">
                            ผู้ดูแลโครงการไม่อนุมัติเข้าปฏิบัติ
                          </a-tag>
                          <p class="mt-2 text-black">
                            รายละเอียดเพิ่มเติม/สาเหตุ :
                            {{ data ? data.managerRemark : '-' }}
                          </p>
                          <p class="mt-2 text-black">
                            วันที่อนุมัติ :
                            {{
                              data && data.managerApprovedDate
                                ? $moment(data.managerApprovedDate).format(
                                    'DD/MM/YYYY HH:mm'
                                  )
                                : '-'
                            }}
                          </p>
                        </div>
                      </a-card>
                      <a-card
                        :title="$t('history.work_permit.ocio_approve')"
                        :bordered="true"
                        class="h-full mt-2"
                      >
                        <div
                          v-if="
                            data
                              ? !data.managerApproved &&
                                user.roleId != 0 &&
                                !data.ocioManagerApproved &&
                                data.ocioManagerApprovedDate === null
                                ? true
                                : false
                              : false
                          "
                        >
                          <a-avatar
                            size="large"
                            icon="user"
                            :style="{
                              backgroundColor: 'orange',
                              verticalAlign: 'middle',
                            }"
                            class="mr-2"
                          />
                          <a-tag color="orange" class="sm:text-sm">
                            รอ DataCenter Manager อนุมัติ
                          </a-tag>
                        </div>
                        <div
                          v-else-if="
                            (data
                              ? data.managerApproved &&
                                !data.ocioManagerApproved &&
                                data.ocioManagerApprovedDate === null &&
                                (user.roleId == 0 || user.roleId == 9)
                                ? true
                                : false
                              : false) || isEdit
                          "
                        >
                          <a-textarea
                            v-model="formApprove.remark"
                            :placeholder="
                              $t('history.work_permit.ocio_fill_remark')
                            "
                            :rows="2"
                            class="mb-4"
                          />
                          <a-button
                            type="primary"
                            icon="check-circle"
                            @click="Approve(true, false)"
                          >
                            อนุมัติ
                          </a-button>
                          <a-button
                            type="danger"
                            icon="close-circle"
                            @click="Approve(false, false)"
                          >
                            ไม่อนุมัติ
                          </a-button>
                        </div>
                        <div
                          v-else-if="
                            data
                              ? !data.managerApproved &&
                                data.managerApprovedDate === null &&
                                !data.ocioManagerApproved &&
                                (user.roleId == 0 || user.roleId == 9)
                                ? true
                                : false
                              : false
                          "
                        >
                          <a-avatar
                            size="large"
                            icon="user"
                            :style="{
                              backgroundColor: 'orange',
                              verticalAlign: 'middle',
                            }"
                            class="mr-2"
                          />
                          <a-tag color="orange" class="sm:text-sm">
                            รอ DataCenter Manager อนุมัติ
                          </a-tag>
                        </div>
                        <div
                          v-else-if="
                            data
                              ? data.managerApproved &&
                                data.ocioManagerApproved &&
                                data.ocioManagerApprovedDate !== null
                                ? true
                                : false
                              : false
                          "
                        >
                          <a-avatar
                            size="large"
                            icon="check"
                            :style="{
                              backgroundColor: '#87d068',
                              verticalAlign: 'middle',
                            }"
                          />
                          <a-tag color="green" class="sm:text-sm">
                            DataCenter Manager อนุมัติเข้าปฏิบัติงาน
                          </a-tag>
                          <p class="mt-2 text-black">
                            รายละเอียดเพิ่มเติม :
                            {{ data ? data.ocioRemark : '-' }}
                          </p>
                          <p class="mt-2 text-black">
                            วันที่อนุมัติ :
                            {{
                              data && data.ocioManagerApprovedDate
                                ? $moment(data.ocioManagerApprovedDate).format(
                                    'DD/MM/YYYY HH:mm'
                                  )
                                : '-'
                            }}
                          </p>
                        </div>
                        <div
                          v-else-if="
                            data
                              ? data.managerApproved &&
                                !data.ocioManagerApproved &&
                                data.ocioManagerApprovedDate !== null
                                ? true
                                : false
                              : false
                          "
                        >
                          <a-avatar
                            size="large"
                            icon="close"
                            :style="{
                              backgroundColor: '#f50',
                              verticalAlign: 'middle',
                            }"
                          />
                          <a-tag color="#f50" class="sm:text-xs">
                            DataCenter Manager ไม่อนุมัติเข้าปฏิบัติ
                          </a-tag>
                          <p class="mt-2 text-black">
                            รายละเอียดเพิ่มเติม/สาเหตุ :
                            {{ data ? data.ocioRemark : '-' }}
                          </p>
                          <p class="mt-2 text-black">
                            วันที่อนุมัติ :
                            {{
                              data && data.ocioManagerApprovedDate
                                ? $moment(data.ocioManagerApprovedDate).format(
                                    'DD/MM/YYYY HH:mm'
                                  )
                                : '-'
                            }}
                          </p>
                        </div>
                      </a-card>
                    </div>
                    <div v-else>
                      <a-card
                        :title="$t('history.work_permit.manager_approve')"
                        :bordered="true"
                        class="h-full"
                      >
                        <div
                          v-if="
                            data
                              ? !data.managerApproved &&
                                data.managerApprovedDate === null &&
                                !data.ocioManagerApproved &&
                                data.ocioManagerApprovedDate === null &&
                                data.managerId !== managerId
                                ? true
                                : false
                              : false
                          "
                        >
                          <a-avatar
                            size="large"
                            icon="user"
                            :style="{
                              backgroundColor: 'orange',
                              verticalAlign: 'middle',
                            }"
                            class="mr-2"
                          />
                          <a-tag color="orange" class="sm:text-sm">
                            รอ ผู้ดูแลโครงการ อนุมัติเข้าปฏิบัติงาน
                          </a-tag>
                        </div>
                        <div
                          v-else-if="
                            (data
                              ? !data.managerApproved &&
                                data.managerApprovedDate === null &&
                                !data.ocioManagerApproved
                                ? true
                                : false
                              : false) || isEdit
                          "
                        >
                          <a-textarea
                            v-model="formApprove.remark"
                            :placeholder="$t('history.work_permit.fill_remark')"
                            :disabled="
                              data ? !(data.managerId === managerId) : true
                            "
                            :rows="2"
                            class="mb-4"
                          />
                          <a-button
                            type="primary"
                            icon="check-circle"
                            :disabled="
                              data ? !(data.managerId === managerId) : true
                            "
                            @click="Approve(true, true)"
                          >
                            อนุมัติ
                          </a-button>
                          <a-button
                            type="danger"
                            icon="close-circle"
                            :disabled="
                              data ? !(data.managerId === managerId) : true
                            "
                            @click="Approve(false, true)"
                          >
                            ไม่อนุมัติ
                          </a-button>
                        </div>
                        <div
                          v-else-if="
                            data
                              ? data.managerApproved &&
                                data.managerApprovedDate !== null
                                ? true
                                : false
                              : false
                          "
                        >
                          <a-avatar
                            size="large"
                            icon="check"
                            :style="{
                              backgroundColor: '#87d068',
                              verticalAlign: 'middle',
                            }"
                          />
                          <a-tag color="green" class="sm:text-sm">
                            ผู้ดูแลโครงการอนุมัติเรียบร้อยแล้ว
                          </a-tag>
                          <p class="mt-2 text-black">
                            รายละเอียดเพิ่มเติม :
                            {{ data ? data.managerRemark : '-' }}
                          </p>
                          <p class="mt-2 text-black">
                            วันที่อนุมัติ :
                            {{
                              data && data.managerApprovedDate
                                ? $moment(data.managerApprovedDate).format(
                                    'DD/MM/YYYY HH:mm'
                                  )
                                : '-'
                            }}
                          </p>
                        </div>
                        <div v-else>
                          <a-avatar
                            size="large"
                            icon="close"
                            :style="{
                              backgroundColor: '#f50',
                              verticalAlign: 'middle',
                            }"
                          />
                          <a-tag color="#f50" class="sm:text-sm">
                            ผู้ดูแลโครงการไม่อนุมัติเข้าปฏิบัติ
                          </a-tag>
                          <p class="mt-2 text-black">
                            รายละเอียดเพิ่มเติม/สาเหตุ :
                            {{ data ? data.managerRemark : '-' }}
                          </p>
                          <p class="mt-2 text-black">
                            วันที่อนุมัติ :
                            {{
                              data && data.managerApprovedDate
                                ? $moment(data.managerApprovedDate).format(
                                    'DD/MM/YYYY HH:mm'
                                  )
                                : '-'
                            }}
                          </p>
                        </div>
                      </a-card>
                      <a-card
                        :title="$t('history.work_permit.ocio_approve')"
                        :bordered="true"
                        class="h-full mt-2"
                      >
                        <div
                          v-if="
                            data
                              ? data.managerApproved &&
                                !data.ocioManagerApproved &&
                                data.ocioManagerApprovedDate === null &&
                                data.ocioId !== DataCentermanagerId
                                ? true
                                : false
                              : false
                          "
                        >
                          <a-avatar
                            size="large"
                            icon="user"
                            :style="{
                              backgroundColor: 'orange',
                              verticalAlign: 'middle',
                            }"
                            class="mr-2"
                          />
                          <a-tag color="orange" class="sm:text-xs">
                            รอ DataCenter Manager อนุมัติ
                          </a-tag>
                        </div>
                        <div
                          v-else-if="
                            (data
                              ? data.managerApproved &&
                                !data.ocioManagerApproved &&
                                data.ocioManagerApprovedDate === null
                                ? true
                                : false
                              : false) || isEdit
                          "
                        >
                          <a-textarea
                            v-model="formApprove.remark"
                            :disabled="
                              data
                                ? !(data.ocioId === DataCentermanagerId)
                                : true
                            "
                            :placeholder="
                              $t('history.work_permit.ocio_fill_remark')
                            "
                            :rows="2"
                            class="mb-4"
                          />
                          <a-button
                            type="primary"
                            :disabled="
                              data
                                ? !(data.ocioId === DataCentermanagerId)
                                : true
                            "
                            icon="check-circle"
                            @click="Approve(true, false)"
                          >
                            อนุมัติ
                          </a-button>
                          <a-button
                            type="danger"
                            :disabled="
                              data
                                ? !(data.ocioId === DataCentermanagerId)
                                : true
                            "
                            icon="close-circle"
                            @click="Approve(false, false)"
                          >
                            ไม่อนุมัติ
                          </a-button>
                        </div>
                        <div
                          v-else-if="
                            data
                              ? !data.managerApproved &&
                                data.managerApprovedDate === null &&
                                !data.ocioManagerApproved &&
                                data.ocioManagerApprovedDate === null
                                ? true
                                : false
                              : false
                          "
                        >
                          <a-avatar
                            size="large"
                            icon="user"
                            :style="{
                              backgroundColor: 'orange',
                              verticalAlign: 'middle',
                            }"
                            class="mr-2"
                          />
                          <a-tag color="orange" class="sm:text-xs">
                            รอ DataCenter Manager อนุมัติ
                          </a-tag>
                        </div>
                        <div
                          v-else-if="
                            data
                              ? data.managerApproved &&
                                data.ocioManagerApproved &&
                                data.ocioManagerApprovedDate !== null
                                ? true
                                : false
                              : false
                          "
                        >
                          <a-avatar
                            size="large"
                            icon="check"
                            :style="{
                              backgroundColor: '#87d068',
                              verticalAlign: 'middle',
                            }"
                          />
                          <a-tag color="green" class="sm:text-xs">
                            DataCenter Manager อนุมัติเข้าปฏิบัติงาน
                          </a-tag>
                          <p class="mt-2 text-black">
                            รายละเอียดเพิ่มเติม :
                            {{ data ? data.ocioRemark : '-' }}
                          </p>
                          <p class="mt-2 text-black">
                            วันที่อนุมัติ :
                            {{
                              data && data.ocioManagerApprovedDate
                                ? $moment(data.ocioManagerApprovedDate).format(
                                    'DD/MM/YYYY HH:mm'
                                  )
                                : '-'
                            }}
                          </p>
                        </div>
                        <div
                          v-else-if="
                            data
                              ? data.managerApproved &&
                                !data.ocioManagerApproved &&
                                data.ocioManagerApprovedDate !== null
                                ? true
                                : false
                              : false
                          "
                        >
                          <a-avatar
                            size="large"
                            icon="close"
                            :style="{
                              backgroundColor: '#f50',
                              verticalAlign: 'middle',
                            }"
                          />
                          <a-tag color="#f50" class="sm:text-xs">
                            DataCenter Manager ไม่อนุมัติเข้าปฏิบัติ
                          </a-tag>
                          <p class="mt-2 text-black">
                            รายละเอียดเพิ่มเติม/สาเหตุ :
                            {{ data ? data.ocioRemark : '-' }}
                          </p>
                          <p class="mt-2 text-black">
                            วันที่อนุมัติ :
                            {{
                              data && data.ocioManagerApprovedDate
                                ? $moment(data.ocioManagerApprovedDate).format(
                                    'DD/MM/YYYY HH:mm'
                                  )
                                : '-'
                            }}
                          </p>
                        </div>
                      </a-card>
                    </div>
                  </a-col>
                  <a-col :md="{ span: 12 }" :lg="{ span: 12 }">
                    <a-card
                      v-if="
                        data ? (data.pinCode === null ? false : true) : false
                      "
                      :title="$t('history.work_permit.qrcode')"
                      :bordered="true"
                      class="h-full"
                    >
                      <a-row type="flex">
                        <a-col :flex="2" align="middle"
                          ><qrcode-vue
                            :value="
                              data
                                ? data.pinCode === null
                                  ? ''
                                  : data.pinCode
                                : ''
                            "
                            size="120"
                            level="H"
                          />
                          <p class="text-2xl mt-1 font-bold text-green-600">
                            {{
                              data
                                ? data.pinCode === null
                                  ? ''
                                  : data.pinCode
                                : ''
                            }}
                          </p></a-col
                        >
                        <a-col :flex="3"
                          ><div>
                            <p>
                              <b>PINCODE :</b>
                              {{
                                data
                                  ? data.pinCode === null
                                    ? ''
                                    : data.pinCode
                                  : ''
                              }}
                            </p>
                            <p>
                              <b>REF NO. :</b>
                              {{
                                data
                                  ? data.bookingId === null
                                    ? ''
                                    : data.bookingId
                                  : ''
                              }}
                            </p>
                            <p>
                              <b>EXPIRE :</b>
                              {{
                                data
                                  ? data.expireDate === null
                                    ? ''
                                    : $moment(data.expireDate).format(
                                        'DD/MM/YYYY'
                                      )
                                  : ''
                              }}
                            </p>
                          </div></a-col
                        >
                      </a-row>
                    </a-card>
                    <a-card
                      :title="$t('history.pre_register.timeline')"
                      :bordered="true"
                      class="h-full mt-2"
                    >
                      <a-timeline mode="right">
                        <a-timeline-item
                          >สร้างคำร้องขอ
                          {{
                            data
                              ? $moment(data.createdAt).format(
                                  'DD/MM/YYYY HH:mm'
                                )
                              : ''
                          }}</a-timeline-item
                        >
                        <a-timeline-item
                          >ตรวจสอบข้อมูลเพื่อขออนุมัติ
                          {{
                            data
                              ? $moment() >
                                $moment(data.createdAt).add(1, 'hour')
                                ? $moment(data.createdAt)
                                    .add(45, 'minute')
                                    .format('DD/MM/YYYY HH:mm')
                                : '-'
                              : ''
                          }}</a-timeline-item
                        >
                        <a-timeline-item
                          v-if="
                            data
                              ? !data.managerApproved
                                ? true
                                : false
                              : false
                          "
                          color="red"
                        >
                          <a-icon
                            slot="dot"
                            type="clock-circle-o"
                            style="font-size: 16px"
                          />
                          {{ data ? getStatus(data) : 'รอการอนุมัติ' }}
                        </a-timeline-item>
                        <a-timeline-item v-else>
                          ผู้ดูแลโครงการอนุมัติเรียบร้อยแล้ว
                          {{
                            data
                              ? $moment(data.managerApprovedDate).format(
                                  'DD/MM/YYYY HH:mm'
                                )
                              : ''
                          }}
                        </a-timeline-item>
                        <a-timeline-item
                          v-if="
                            data
                              ? !data.ocioManagerApproved &&
                                data.ocioManagerApprovedDate === null
                                ? true
                                : false
                              : false
                          "
                          color="red"
                        >
                          <a-icon
                            slot="dot"
                            type="clock-circle-o"
                            style="font-size: 16px"
                          />
                          {{ 'รอ DataCenter Manager อนุมัติ' }}
                        </a-timeline-item>
                        <a-timeline-item v-else
                          >DataCenter Manager อนุมัติเรียบร้อยแล้ว
                          {{
                            data
                              ? $moment(data.ocioManagerApprovedDate).format(
                                  'DD/MM/YYYY HH:mm'
                                )
                              : ''
                          }}
                        </a-timeline-item>
                        <a-timeline-item
                          v-if="
                            data
                              ? data.ocioManagerApproved === true &&
                                data.managerApproved === true
                                ? true
                                : false
                              : false
                          "
                        >
                          <a-icon
                            slot="dot"
                            type="check-circle"
                            style="font-size: 16px"
                            theme="twoTone"
                            two-tone-color="#52c41a"
                          />
                          {{ 'เข้าปฏิบัติงาน' }}
                        </a-timeline-item>
                        <a-timeline-item v-else color="red">
                          <a-icon
                            slot="dot"
                            type="clock-circle-o"
                            style="font-size: 16px"
                          />
                          {{ 'เข้าปฏิบัติงาน' }}
                        </a-timeline-item>
                      </a-timeline>
                    </a-card>
                  </a-col>
                </a-row>
              </a-card>
            </a-card>
          </div>
        </div>
      </a-spin>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {
  ref,
  computed,
  watch,
  defineComponent,
  reactive,
  useContext,
  useStore,
} from '@nuxtjs/composition-api'
import moment from 'moment'
import { find } from 'lodash'
import QrcodeVue from 'qrcode.vue'

interface WorkPermitForm {
  id: number | null
  accountId: string | null
  bookingId: string | null
  pinCode: string | null
  firstname: string | null
  lastname: string | null
  citizenId: string | null
  email: string | null
  mobile: string | null
  company: string | null
  projectName: string | null
  description: string | null
  workingDate: any | null
  serverRoomId: number | null
  agency: string | null
  rackNo: string | null
  timeFrom: string | null
  timeTo: string | null
  managerId: number | null
  emailManager: string | null
  ocioManager: string | null
  emailOcioManager: string | null
  managerApproved: boolean | false
  managerApprovedDate: Date | null
  ocioManagerApproved: boolean | false
  ocioManagerApprovedDate: Date | null
  tokenId: string | null
  ticketId: number | null
  createdAt: Date | null
  createdBy: string | null
  updatedAt: Date | null
  updatedBy: string | null
  deletedAt: string | null
  deletedBy: Date | null
  deleteRemark: string | null
  guid: string | null
  managerRemark: string | null
  ocioRemark: string | null
}

interface ApproveForm {
  guid: string | null
  manager: boolean | null
  approved: boolean | null
  remark: string | null
  approvedBy: string | null
  approvedDate: Date | null
}

export default defineComponent({
  components: {
    QrcodeVue,
  },
  props: {
    visible: {
      type: Boolean,
      required: false,
    },
    guid: {
      type: String,
      required: true,
    },
  },

  setup(props, context) {
    const {
      $auth: { user },
    } = useContext()

    const Store = useStore()

    // const isConfirmLoading = ref(false)
    const isEdit = ref(false)
    const data = ref<WorkPermitForm>()
    const i18n = context.root.$i18n
    const locales = ref(i18n.locales)
    const currentLocale = computed(() => {
      return find(locales.value, (l: any) => l.code === i18n.locale)
    })
    const errorMessage = ref()
    const serverRoomName = ref(String)
    const managerName = ref(String)
    const managerId = ref(0)
    const DataCentermanagerId = ref(0)
    const formApprove = reactive<ApproveForm>({
      guid: null,
      manager: true,
      approved: false,
      remark: null,
      approvedBy: null,
      approvedDate: null,
    })
    const updated = ref(false)

    function getStatus(data: any) {
      if (
        !data.managerApproved &&
        !data.ocioManagerApproved &&
        data.managerApprovedDate === null &&
        data.ocioManagerApprovedDate === null
      ) {
        return 'รอผู้ดูแลโครงการอนุมัติ'
      } else if (
        data.managerApproved &&
        !data.ocioManagerApproved &&
        data.ocioManagerApprovedDate === null
      ) {
        return 'รอ DataCenter Manager อนุมัติ'
      } else if (!data.managerApproved && data.managerApprovedDate !== null) {
        return 'ผู้ดูแลโครงการไม่อนุมัติ'
      } else if (
        !data.ocioManagerApproved &&
        data.ocioManagerApprovedDate !== null
      ) {
        return 'OCIO Manager ไม่อนุมัติ'
      } else if (data.ocioManagerApproved && data.ocioManagerApproved) {
        return 'อนุมัติเข้าปฏิบัติงาน'
      } else {
        return 'รอการอนุมัติ'
      }
    }

    function Permission() {
      return context.root.$axios
        .get('Auth/Permission', {})
        .then((res) => {
          managerId.value = res.data?.managerId
          DataCentermanagerId.value = res.data?.datacentermangerId
          // console.log('DataCentermanagerId', DataCentermanagerId.value)
        })
        .catch(() => {})
    }

    function fetchAPI() {
      isEdit.value = false
      // isConfirmLoading.value = false
      Store.commit('global/SET_CLOSE_LOADER')
      return context.root.$axios
        .get(`History/GetHistory/WorkPermit/${props.guid}`, {})
        .then((res) => {
          // isConfirmLoading.value = true
          Store.commit('global/SET_OPEN_LOADER')
          formApprove.guid = props.guid
          data.value = res.data as WorkPermitForm
          if (data.value.serverRoomId !== null) {
            getServerRoomName(data.value.serverRoomId)
          }
          if (data.value.managerId !== null) {
            getManagerName(data.value.managerId)
          }
          // console.log(res.data)
        })
        .catch((e) => {
          // console.log(e) // eslint-disable-line no-console
          const modal = {
            title: 'มีข้อผิดพลาด',
            content: '',
          }

          if (e.response.status === 400) {
            modal.title = e.response.data.message.th
            modal.content = e.response.data.message.th
          } else {
            modal.title = 'ไม่สำเร็จ'
            modal.content = e.response.data.message.th
          }

          context.root.$error(modal)
        })
        .finally(() => {
          // isConfirmLoading.value = false
          Store.commit('global/SET_CLOSE_LOADER')
        })
    }

    function editApproved() {
      isEdit.value = true
    }

    function getServerRoomName(id: number) {
      if (id) {
        context.root.$axios.get(`ServerRoom/${id}`).then(({ data }) => {
          serverRoomName.value = data.roomName
        })
      }
    }

    function getManagerName(id: number) {
      if (id) {
        context.root.$axios.get(`LineManager/${id}`).then(({ data }) => {
          managerName.value = data.managerName
        })
      }
    }

    function Approve(a: boolean, m: boolean) {
      // isConfirmLoading.value = true
      Store.commit('global/SET_OPEN_LOADER')
      return context.root.$axios
        .post('WorkPermit/Approved', {
          guid: formApprove.guid,
          manager: m,
          approved: a,
          approvedDate: moment(),
          remark: formApprove.remark,
          approvedBy: formApprove.approvedBy,
        })
        .then(() => {
          const Str =
            a === true
              ? 'อนุมัติขอเข้าปฏิบัติงานสำเร็จ'
              : 'อนุมัติขอเข้าปฏิบัติไม่งานสำเร็จ'
          context.root.$success({
            title: 'บันทึกสำเร็จ',
            content: Str,
          })
          formApprove.manager = false
          formApprove.approved = false
          formApprove.approvedDate = null
          formApprove.remark = null
          updated.value = true
          Permission()
          fetchAPI()
        })
        .catch((e) => {
          console.error('code: ', e.response.status)
          console.error('response: ', e.response.data) // eslint-disable-line no-console
          const modal = {
            title: 'อนุมัติไม่สำเร็จ',
            content: 'กรุณาตรวจสอบข้อมูลและลองใหม่อีกครั้ง',
          }
          context.root.$error(modal)
          updated.value = false
        })
        .then(() => {
          // isConfirmLoading.value = false
          Store.commit('global/SET_CLOSE_LOADER')
        })
    }

    function filterOption(input: any, option: any) {
      const text = option.componentOptions.children[0].text.toLowerCase()
      return text.includes(input.toLowerCase())
    }

    watch(
      () => props.guid,
      () => {
        if (
          props.guid !== '' &&
          props.guid != null &&
          props.guid !== 'undefined'
        ) {
          updated.value = false
          Permission()
          fetchAPI()
        }
      }
    )

    watch(
      () => user,
      (v) => {
        formApprove.approvedBy = v?.displayName || null
      },
      {
        immediate: true,
      }
    )

    const titleCard = computed(() => {
      let title = i18n.t('history.pre_register.user_type')
      title =
        title +
        ' : ' +
        (data === null
          ? i18n.t('history.pre_register.guest')
          : i18n.t('history.pre_register.member'))

      return title
    })

    return {
      moment,
      isConfirmLoading: computed(() => Store.getters['global/getLoader']),
      data,
      titleCard,
      currentLocale,
      editApproved,
      Approve,
      isEdit,
      filterOption,
      errorMessage,
      formApprove,
      getStatus,
      serverRoomName,
      getServerRoomName,
      managerName,
      getManagerName,
      updated,
      managerId,
      Permission,
      user,
      DataCentermanagerId,
    }
  },
})
</script>
