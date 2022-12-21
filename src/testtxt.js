export const txt1 = `<template>
<div>
  <PageCommonFrame
    @onPageScroll="onPageScroll"
    @onReachBottom="onReachBottom"
    @onPullDownRefresh="onPullDownRefresh"
  >
    <div class="w-.5 h-375
    w-55 w-w-4 w-4_4 w-44..4">
      <div class="home-wrapper">
        <bannerHead
          @controlUserNumberView="controlUserNumberView"
          @jumpToRule="jumpToRule"
        />
        <div class="course pos-r">
          <raceSchedule
            :allSchedulesInfo="state.allSchedulesInfo"
            :chooseSchedulesInfo="state.chooseSchedulesInfo"
            :userSelectTab="state.userSelectTab"
            @userChooseDate="userChooseDate"
            @userOpenSureMask="userOpenSureMask"
            @share="activityShare"
            @goCategoryList="goCategoryList"
            ref="raceScheduleRef"
          />
          <div class="course_bg w-1.2 w-3.1 w3.2 ww3.3 w--3.4 w-w-3.5 ww--3.6 w-0.0 w-0 w-.1 h-1 h-1.1"></div>
        </div>
        <freeList
          :userSelectFreeTab="state.userSelectFreeTab"
          :lastDayFreeUsers="lastDayFreeUsers"
          :freeUserArray="state.freeUserArray"
          :dailyRankStatus="dailyRankStatus"
          :lastDayFreeNum="lastDayFreeNum"
          :aggrFreeNum="aggrFreeNum"
          @userChooseFreeTab="userChooseFreeTab"
          v-if="state?.userType === 1"
        />
        <LastFreeList
          v-else-if="state?.userType === 2"
          :lastDayGuessUsers="state?.lastDayGuessUsers"
          :lastDayFreeNum="lastDayFreeNum"
          :aggrFreeNum="state?.aggrFreeNum"
          :dailyRankStatus="dailyRankStatus"
          :sceneInfo="state?.sceneInfo"
          @goCategoryList="goCategoryList"
        />
        <!-- <Popup :show="state.showUserNumberView" @click-overlay="show = false"> -->
        <!-- </Popup> -->
        <div class="trading_area_logo w-88p8 w-03 h-3.345 w-123.456 w-0 w-00">
          <!-- <img
            class="logo w-375 w-4.1z"
            src="https://images.lssqpay.com/app/h5/groupfoodonlineactivity/worldcupList/trading_area_logo.png"
            alt=""
          /> -->
          <!-- </Popup> -->
          <div class="trading_area_logo">
            <img
              class="logo"
              src="https://images.lssqpay.com/app/h5/groupfoodonlineactivity/worldcupList/trading_area_logo.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </PageCommonFrame>
  <numberList
    :userNumberArray="state.userNumberArray"
    :showUserNumberView="state.showUserNumberView"
    :mineUserInfo="state.mineUserPickInfo"
    @controlUserNumberView="controlUserNumberView"
    @share="activityShare"
  />
  <!-- 竞猜弹窗 -->
  <Popup :show="state.pickingShow" @click-overlay="show = false">
    <PickingPop
      :isShow="state.pickingShow"
      :pickingInfo="state.pickingInfo"
      :pickingType="state.pickingType"
      @hide="state.pickingShow = false"
      @userSendGuess="userSendGuess"
      @jumpToRule="jumpToRule"
    ></PickingPop>
  </Popup>
</div>
</template>

<script setup lang="ts">
import PageCommonFrame from "@/components/PageCommonFrame/pageCommonFrame.vue";
import bannerHead from "./components/bannerHead.vue";
import freeList from "./components/freeList.vue";
import numberList from "./components/numberList.vue";
import PickingPop from "./components/pickingPop.vue";
import { Popup } from "vant";
import raceSchedule from "./components/raceSchedule.vue";
import LastFreeList from "./components/lastFreeList.vue";
import {
getGuessRank,
getWorldcupAllInfos,
userRequestJoinGuess,
} from "./api/index";
import { onMounted, reactive, computed, ref, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
import { useStore } from "@/store";
const store = useStore();
import { checkoutUserLoginStatus } from "@/common/index";
import { envUrl } from "@/common/config";
import { pageState } from "@/common/utils";
import { checkWXjssdkIsReady } from "@/common/initPostion";

const raceScheduleRef = ref(null);

const state: any = reactive({
// 世界杯所有信息
allInfos: null,
// 用户选中的免单场次
userSelectFreeTab: 0,
// 用户选中的时间栏目
userSelectTab: 0,
// 竞猜弹窗是否显示
pickingShow: false,
// 竞猜类型 （123 左中右）
pickingType: 0,
// 竞猜id
pickingId: null,
// 竞猜选中信息
pickingInfo: {
  host: {},
  guest: {},
  userGuessWin: {},
},
//用户选中的竞猜信息
chooseSchedulesInfo: [],
//所有竞猜信息
allSchedulesInfo: [],
//是否展示总榜单
showUserNumberView: false,
//总榜单数据
userNumberArray: [],
mineUserPickInfo: {},
//免单展示列表
freeUserArray: [],
// 中奖列表展示类型 1-免单用户（小组赛），2-猜中用户（淘汰赛）
userType: 0,
// 累计获奖人数
aggrFreeNum: 0,
// 昨日猜中人员列表
lastDayGuessUsers: [],
// 场景信息
sceneInfo: {},
});

//免单列表所有信息
const lastDayFreeUsers = computed(() => {
return state.allSchedulesInfo[state.userSelectTab]?.lastDayFreeUsers ?? [];
});

// 日期榜显示状态（1-活动未开启，2-活动已开启已开奖，3-活动已开启未开奖）
const dailyRankStatus = computed(() => {
return state.allSchedulesInfo[state.userSelectTab]?.dailyRankStatus ?? 0;
});
//上期免单用户
const lastDayFreeNum = computed(() => {
return state.allSchedulesInfo[state.userSelectTab]?.lastDayFreeNum ?? 0;
});
//已累计免单
const aggrFreeNum = computed(() => {
return state.allSchedulesInfo[state.userSelectTab]?.aggrFreeNum ?? 0;
});
// 跳转分类页
const goCategoryList = () => {
// if (!checkoutUserLoginStatus()) return;
const sceneId = state?.sceneInfo?.id || "";
};

//跳转规则
function jumpToRule(): void {
const host = envUrl.replace("/api", "");
}
//打开关闭总榜单
function controlUserNumberView(boo: boolean): void {
state.showUserNumberView = boo;
}
//打开确认提交结果信息
function userOpenSureMask(item, num) {
//num （123 左中右）
state.pickingType = Number(num);
state.pickingId = item?.id;
state.pickingInfo.host = item?.host;
state.pickingInfo.guest = item?.guest;
state.pickingInfo.userGuessWin = num == 1 ? item?.host : item?.guest;
state.pickingInfo.matchType = item?.matchType;

}
//提交结果
function userSendGuess() {
if (!checkoutUserLoginStatus()) return;
state.pickingShow = false;
const obj = { scheduleId: state.pickingId, guessed: state.pickingType };
userRequestJoinGuess(obj).then(ress => {
  const res = ress?.schedule;
  const index = state.chooseSchedulesInfo.findIndex(elements => {
    return elements.id == res?.id;
  });
  if (index !== -1) {
    state.chooseSchedulesInfo[index].guessStatus = res?.guessStatus;
    state.chooseSchedulesInfo[index].guess.left.percent =
      res?.guess?.left?.percent;
    if (state.chooseSchedulesInfo[index].guess?.mid?.percent) {
      state.chooseSchedulesInfo[index].guess.mid.percent =
        res?.guess?.mid?.percent;
    }
    state.chooseSchedulesInfo[index].guess.right.percent =
      res?.guess?.right?.percent;
    state.chooseSchedulesInfo[index].guess.guessed = res?.guess?.guessed;
  }
});
}
//用户选中免单日期
function userChooseFreeTab(index: number) {
state.userSelectFreeTab = index;
if (lastDayFreeUsers.value?.length) {
  state.freeUserArray =
    lastDayFreeUsers.value[state.userSelectFreeTab]?.freeUsers;
  // console.log(lastDayFreeUsers.value);
  // console.log(state.freeUserArray);
}
}

//选中日期
function userChooseDate(index: number | string) {
state.userSelectTab = Number(index);
state.chooseSchedulesInfo =
  state.allSchedulesInfo[state.userSelectTab]?.schedules;
state.userType = Number(state.allSchedulesInfo[state.userSelectTab].userType);
if (state?.userType === 2) {
  setLastDayGuessUserInfo();
}
const indexs =
  state.allSchedulesInfo[state.userSelectTab]?.defaultShowFreeIndex ?? 0;
userChooseFreeTab(indexs);
}

const setLastDayGuessUserInfo = () => {
state.lastDayGuessUsers =
  state?.allSchedulesInfo[state?.userSelectTab]?.lastDayGuessUsers || [];
state.aggrFreeNum =
  state?.allSchedulesInfo[state?.userSelectTab]?.aggrFreeNum || 0;
state.sceneInfo =
  state?.allSchedulesInfo[state?.userSelectTab]?.sceneInfo || {};
};
//请求活动信息
function requestForAllInfos() {
getWorldcupAllInfos().then(res => {
  state.allInfos = res;
  state.userSelectTab = Number(res?.serial);
  state.allSchedulesInfo = res?.batchSchedules;
  state.chooseSchedulesInfo =
    state.allSchedulesInfo[state.userSelectTab]?.schedules;
  state.userType = Number(
    state.allSchedulesInfo[state.userSelectTab].userType,
  );

  const indexs =
    state.allSchedulesInfo[state.userSelectTab]?.defaultShowFreeIndex ?? 0;
  userChooseFreeTab(indexs);
  if (state.userType === 2) {
    setLastDayGuessUserInfo();
  }

  console.log(
    state.chooseSchedulesInfo,
    state.allSchedulesInfo[state.userSelectTab],
    state.userType,
  );
});
}
async function requestGuessRankInfo() {
try {
  const res: any = await getGuessRank({});
  if (res) {
    state.userNumberArray = res?.users ?? [];
    state.mineUserPickInfo = res?.mine ?? {};
  }
} catch (err) {
  console.error(err);
}
}
// 分享处理
const activityShare = (pageType = 36) => {
if (!checkoutUserLoginStatus()) return;
const shareDatas: any = {
  pageType,
};
if (pageState?.isInsideMini) {

  console.log("分享链接", url);
  checkWXjssdkIsReady().then(() => {
    window.wx.miniProgram.navigateTo({
      url,
    });
  });
}
};
//初始化数据
function initState() {
state.userSelectFreeTab = 0;
state.userSelectTab = 0;
state.pickingShow = false;
state.pickingType = 0;
state.pickingId = null;
state.pickingInfo = {
  host: {},
  guest: {},
  userGuessWin: {},
};
state.chooseSchedulesInfo = [];
state.allSchedulesInfo = [];
state.showUserNumberView = false;
state.userNumberArray = [];
state.mineUserPickInfo = {};
state.freeUserArray = [];
state.userType = 0;
raceScheduleRef.value.initCountNum();
}
//初始化页面信息
function initPage() {
initState();
requestForAllInfos();
requestGuessRankInfo();
}
onMounted(async () => {
const query = route.query;
initPage();
// controlUserNumberView(true);
});

function onPageScroll(e) {
}
function onReachBottom() {
}
function onPullDownRefresh() {
initPage();
}
</script>
<style lang="scss" scoped>
:deep(.van-popup) {
background: none;
overflow-y: hidden;
}
.home {
width: 750px;
min-height: 100vh;
background: #ecfcff;
-webkit-transform: translateZ(0);
-moz-transform: translateZ(0);
-ms-transform: translateZ(0);
-o-transform: translateZ(0);
transform: translateZ(0);
.home-wrapper {
  width: 750px;
  min-height: 100%;
  background: #ecfcff;
  .course {
    margin-top: -50px;
    & > .course_bg {
      content: "";
      display: block;
      width: 100%;
      height: 223px;
      position: absolute;
      top: 0;
      left: 0;
      background: url(https://images.lssqpay.com/app/h5/groupfoodonlineactivity/worldcupList/course_bg.png);
      background-size: cover;
      z-index: 1;
    }
  }
}
.trading_area_logo {
  margin: 48px auto 0 auto;
  padding-bottom: 108px;
  width: 371px;
  .logo {
    width: 100%;
    height: 49px;
    object-fit: cover;
  }
}
}
.moveleft-enter-active,
.moveleft-leave-active {
transition: all 0.5s ease;
}
.moveleft-enter-from {
transform: translateX(0);
}
.moveleft-enter-to {
transform: translateX(-100%);
}
.moveleft-leave-from {
transform: translateX(0);
}
.moveleft-leave-to {
transform: translateX(-100%);
}

.moveright-enter-active,
.moveright-leave-active {
transition: all 0.5s ease;
}
.moveright-enter-from {
transform: translateX(-100%);
}
.moveright-enter-to {
transform: translateX(0);
}
.moveright-leave-from {
transform: translateX(-100%);
}
.moveright-leave-to {
transform: translateX(0);
}
</style>
`;
