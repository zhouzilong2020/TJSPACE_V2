<template>
  <div class="drwaer-option flex-center">
    <q-tabs
      v-model="tab"
      indicator-color="blue"
      active-bg-color="grey"
      horizontal
      dense
    >
      <ul class="drawer-option-list">
        <li v-for="(dept, i) in depts" :key="i">
          <div v-if="i % 3 == 0" class="row">
            <q-tab
              class="dept-icon"
              v-if="i < depts.length"
              :icon="depts[i].icon"
              :label="depts[i].abbr"
            />
            <q-tab
            class="dept-icon"
              v-if="i + 1 < depts.length"
              :icon="depts[i + 1].icon"
              :label="depts[i + 1].abbr"
            />
            <q-tab
            class="dept-icon"
              v-if="i + 2 < depts.length"
              :icon="depts[i + 2].icon"
              :label="depts[i + 2].abbr"
            />
          </div>
        </li>
      </ul>
    </q-tabs>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      tab: "",
      depts: [
        { title: "软件学院", abbr: "	软件	", icon: "android" },
        {
          title: "联合国环境署_同济大学环境与可持续发展学院",
          abbr: "环境",
          icon: "img:" + require("../../assets/dept_icon/un.png"),
        },
        {
          title: "中德学院",
          abbr: "	中德	",
          icon: "img:" + require("../../assets/dept_icon/deguo.png"),
        },
        {
          title: "中法工程和管理学院",
          abbr: "	中法	",
          icon: "img:" + require("../../assets/dept_icon/faguo.png"),
        },
        {
          title: "中德工程学院",
          abbr: "	德工	",
          icon: "img:" + require("../../assets/dept_icon/deguo.png"),
        },
        {
          title: "中意学院",
          abbr: "	中意	",
          icon: "img:" + require("../../assets/dept_icon/yidali.png"),
        },
        {
          title: "中芬中心",
          abbr: "	中芬	",
          icon: "img:" + require("../../assets/dept_icon/fenlan.png"),
        },
        {
          title: "中西学院",
          abbr: "中西",
          icon: "img:" + require("../../assets/dept_icon/xibanya.png"),
        },
        { title: "机械与能源工程学院", abbr: "机能", icon: "build" },
        { title: "经济与管理学院", abbr: "	经管	", icon: "	work_outline	" },
        { title: "环境科学与工程学院", abbr: "	环科	", icon: "	local_florist	" },
        { title: "材料科学与工程学院", abbr: "	材料	", icon: "	layers	" },
        { title: "电子与信息工程学院", abbr: "	电信	", icon: "	wifi_tethering	" },
        { title: "人文学院", abbr: "	人文	", icon: "psychology" },
        { title: "外国语学院", abbr: "	外语	", icon: "	g_translate	" },
        { title: "法学院", abbr: "	法律	", icon: "gavel" },
        { title: "马克思主义学院", abbr: "马院", icon: "	local_library	" },
        { title: "政治与国际关系学院", abbr: "	国关	", icon: "	public	" },
        { title: "理学部", abbr: "	理学	", icon: "	bar_chart	" },
        { title: "海洋与地球科学学院", abbr: "	海科	", icon: "	waves	" },
        { title: "航空航天与力学学院", abbr: "	航力	", icon: "	local_airport	" },
        { title: "数学科学学院", abbr: "	数学	", icon: "	calculate	" },
        { title: "物理科学与工程学院", abbr: "	物理	", icon: "	design_services	" },
        { title: "化学科学与工程学院", abbr: "	化学	", icon: "	science	" },
        { title: "汽车学院", abbr: "	汽车	", icon: "	directions_car	" },
        { title: "交通运输工程学院", abbr: "	交运	", icon: "	commute	" },
        { title: "测绘与地理信息学院", abbr: "	测绘	", icon: "	square_foot	" },
        { title: "生命科学与技术学院", abbr: "	生科	", icon: "grass" },
        { title: "医学院", abbr: "	医学	", icon: "	local_hospital	" },
        { title: "设计创意学院", abbr: "	设创	", icon: "	create	" },
        { title: "口腔医学院", abbr: "	口腔	", icon: "	insert_emoticon	" },
        { title: "艺术与传媒学院", abbr: "	艺传	", icon: "	theaters	" },
        { title: "体育教学部", abbr: "	体育	", icon: "	fitness_center	" },
        { title: "铁道与城市轨道交通研究院", abbr: "	轨道	", icon: "	train	" },
        { title: "女子学院", abbr: "	女子	", icon: "iconfont icon-nv	" },
        {
          title: "职业技术教育学院",
          abbr: "	职教	",
          icon: "	supervised_user_circle	",
        },
        { title: "国际文化交流学院", abbr: "	国文	", icon: "forum	" },
        { title: "新农村发展研究院", abbr: "	农村	", icon: "	house	" },
        { title: "国际足球学院", abbr: "	足球	", icon: "	sports_soccer	" },
        { title: "上海国际知识产权学院", abbr: "	产权	", icon: "	policy	" },
        { title: "创新创业学院", abbr: "	创业	", icon: "	flight_takeoff	" },
        { title: "新生院", abbr: "	新生院	", icon: "	child_care	" },
        { title: "建筑与城市规划学院", abbr: "	城规	", icon: "	apartment	" },
        { title: "土木工程学院", abbr: "	土木	", icon: "	engineering	" },
      ],
    };
  },
};
</script>

<style scoped>
.drwaer-option ul {
  list-style-type: none;
  padding-left:0;
  margin-left:0;
}
.drwaer-option .dept-icon {
  width: 60px;
}
</style>
