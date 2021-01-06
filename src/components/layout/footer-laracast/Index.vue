<template>
  <footer class="footer">
    <div class="container clearfix">
      <div class="left">
        <h1 class="logo logo--light">
          <span class="l">TJSPACE·同济大学社群</span>
        </h1>

        <p class="description">
          一个由
          <a href="/join">buy Jeffrey lunch</a> once a month, see for yourself,
          and massively level up your skills in the process.
        </p>

        <ul class="social-links">
          <li class="social-link">
            <a href="http://facebook.com/laracasts">
              <img :src="require(assets / facebook.png)" />
            </a>
          </li>

          <li class="social-link">
            <a href="http://twitter.com/laracasts">
              <img src="assets/twitter.png" />
            </a>
          </li>

          <li class="social-link">
            <a href="https://github.com/laracasts">
              <img src="assets/github.png" />
            </a>
          </li>
        </ul>
      </div>

      <div class="right">
        <div>
          <h5 class="heading">links</h5>

          <ul class="zeroed">
            <li><a href="https://4m3.tongji.edu.cn">4毛3分钱</a></li>
            <li><a href="https://1.tongji.edu.cn">4%3=1</a></li>
            <li class="">
              <a href="https://laracasts.com/newsletters/2016/june"
                >Newsletter</a
              >
            </li>
            <li><a href="/recommended-reading">Books</a></li>
            <li><a href="https://laracasts.com/join">Sign Up</a></li>
            <li><a href="https://laracasts.com/login">Log In</a></li>
          </ul>
        </div>

        <div>
          <h5 class="heading">Discuss</h5>

          <ul class="zeroed">
            <li><a href="/discuss">Forum</a></li>
            <li><a href="http://laracasts.audio">Laracasts Podcast</a></li>
            <li><a href="http://laravelpodcast.com">Laravel Podcast</a></li>
          </ul>
        </div>

        <div>
          <h5 class="heading">Extras</h5>

          <ul class="zeroed">
            <li><a href="https://laracasts.com/stats">Statistics</a></li>
            <li><a href="/testimonials">Testimonials</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Get Support</a></li>
            <li><a href="/feed">RSS</a></li>
            <li><a href="https://forge.laravel.com/">Laravel Forge</a></li>
            <li><a href="https://larajobs.com/?partner=36#">Larajobs</a></li>
          </ul>
        </div>

        <div>
          <h5 class="heading">Grown Up Stuff</h5>

          <ul class="zeroed">
            <li><a href="/privacy">Privacy</a></li>
            <li><a href="/terms">Terms</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="secondary">
      <div class="container clearfix">
        <div class="utility-left">
          <p class="copyright">
            © TJSPACE·同济大学社群 2020. All rights reserved.
          </p>

          <div class="hosting">
            Proudly hosted with
            <a href="https://forge.laravel.com">Laravel Forge</a> and
            <a href="https://www.digitalocean.com/?refcode=d2070a2d5f35"
              >DigitalOcean</a
            >.
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
a {
  background-color: transparent;
  color: #99c93d;
}

p {
  line-height: 1.85em;
  margin-top: 0;
}

ul {
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  line-height: 1.3em;
  color: #505b69;
  font-family: Lato;
  margin: 1em 0;
}

.footer {
  background: #fff;
  border-top: 1px solid #f2f2f2;
  color: #9ba6b5;
  padding-top: 70px;
  font-family: "Lato", sans-serif;
  .container {
    max-width: 1200px;
    position: relative;
    margin: 0 auto;
    &:before,
    &:after {
      content: "";
      display: table;
    }
  }
  /* Logo */
  .logo {
    margin: 0 32px 0 0;
    margin-bottom: 24px;
    border-right: none;
    float: left;
    font-size: 28px;
    font-weight: 700;
    padding-right: 20px;
  }
  .logo--light {
    color: #5a6779;
    letter-spacing: 0.5px;
    > .l {
      background: 0 0;
      border-left: 2px solid #9ba6b5;
      margin-right: 0;
      padding: 0 1px 0 7px;
      -webkit-animation: none;
      animation: none;
    }
  }
  /* Description */
  .description {
    margin-bottom: 0;
    font-size: 15px;
    clear: both;
  }
  /* Social links */
  .social-link {
    margin-top: 50px;
    margin-right: 10px;
    color: #fff;
    display: inline-block;
    > a {
      color: inherit;
      line-height: 1.7em;
      font-size: 14px;
      display: block;
      line-height: 1;
      border-radius: 2px;
    }
  }
  .heading {
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: -0.5px;
    margin-bottom: 10px;
    margin-top: 9px;
    font-size: 0.83em;
  }
  .left {
    width: calc(99.99% * 4 / 12 - (30px - 30px * 4 / 12));
    margin-right: calc(
      99.99% * 1 / 12 - (30px - 30px * 1 / 12) + (30px * 2)
    ) !important;
    float: left;
  }
  .right {
    width: calc(99.99% * 7 / 12 - (30px - 30px * 7 / 12));
    float: left;
    > div {
      width: calc(99.99% * 1 / 4 - (30px - 30px * 1 / 4));
      ul {
        list-style: none;
        a {
          color: inherit;
          line-height: 1.7em;
          font-size: 14px;
        }
      }
      &:nth-child(4n + 1) {
        clear: left;
      }
      &:nth-child(1n) {
        float: left;
        margin-right: 30px;
        clear: none;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  /* FOOTER SECONDARY */
  .secondary {
    // padding: 25px 0;
    background: #1bb1b2;
    position: relative;
    margin-top: 70px;
    .copyright {
      // color: #fff;
      margin: 0 0 4px;
    }
    .hosting {
      // color: #cdfbff;
      font-size: 13px;
      a {
        color: inherit;
        font-weight: 700;
        text-decoration: none;
      }
    }
    .utility-left {
      float: left !important;
    }
    .utility-right {
      float: right !important;
    }
  }
}
</style>
