<template>
  <footer class="footer">
    <div class="logo"></div>
    <ul class="links">
      <li v-for="(link, i) in links" :key="i">
        <a target="_blank" :href="link.url" v-text="link.text"></a>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  props: {
    links: {
      default() {
        return [
          {
            url: "https://tongji.space/aboutus.html/",
            text: "关于 TJSPACE",
          },
          {
            url: "http://beian.miit.gov.cn/",
            text: "粤ICP备2021003490号",
          },
        ];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  background-color: #f0f0f0;
  // border-top: 1px solid #bebebe;
  padding: 10px 30px;
  padding-left: 10px;
  font-family: "Montserrat-Regular", "RobotoDraft", "Helvetica", arial,
    sans-serif;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    flex: 100%;
    height: 35px;
    background-size: contain;
    background: url(../../../assets/tjspace-logo.svg) no-repeat center;
    max-width: 300px;
  }
  .breif {
    flex: 20%;
    width: 20px;
  }
  .links {
    margin: 0;
    display: flex;
    flex-direction: row;
    font-size: 12px;
    justify-content: space-between;
    list-style: none;
    li {
      & + li {
        margin-left: 25px;
      }
      a {
        border-bottom: solid 1px;
        color: #b9b9b9;
        text-decoration: none;
        &:hover {
          color: rgba(90, 90, 90, 0.95);
        }
      }
    }
  }
}
</style>
