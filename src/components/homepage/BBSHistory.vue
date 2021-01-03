<template>
  <q-card
    flat
    bordered
    class="BBSHistory"
    style="min-width: 240px; max-width: 300px"
  >
    <q-item>
      <q-item-section avatar>
        <q-icon color="black" name="library_books"></q-icon>
      </q-item-section>
      <q-item-section>
        <q-item-label>历史发帖</q-item-label>
      </q-item-section>
    </q-item>
    <q-chip size="md" color="green" text-color="white" icon="assignment">
      BBS
    </q-chip>
    <!-- 循环渲染 -->
    <q-card-section
      style="width: 100%"
      flat
      class="no-padding"
      v-for="(post, i) in postList"
      :key="i"
    >
      <div class="col items-center q-px-md q-py-sm q-gutter-sm">
        <q-btn
          align="left"
          padding="none"
          flat
          :to="{
            name: 'Forum',
            params: { postId: post.postId },
          }"
        >
          {{ collapse(post.title ? post.title : "Post Title", 22) }}
        </q-btn>
        <q-item-label class="text-overline text-grey-8">{{
          post.createTime
        }}</q-item-label>
        <!-- 帖子的内容 -->
        <div style="word-wrap: break-word" class="text-body">
          {{ collapse(post.content, 120) }}
        </div>
        <template class="row inline">
          <q-item-label caption class="inline">
            <template>
              {{ "活跃于  " + post.latestTime }}
            </template>
            <!-- position: absolute; right: 5px; bottom: 10px -->
            <div class="q-pt-sm">
              {{ post.replyCount.toString().padStart(3, "0")
              }}<q-icon class="grey-8" name="reply" />
              {{ post.positiveCount.toString().padStart(3, "0") + " "
              }}<q-icon class="grey-8" name="thumb_up" />
              {{ post.negativeCount.toString().padStart(3, "0") + " "
              }}<q-icon class="grey-8" name="thumb_down" />
            </div>
          </q-item-label>
        </template>
      </div>

      <!-- 按钮 -->
      <q-btn
        color="grey-7"
        round
        flat
        class="absolute"
        style="top: 5px; right: 0"
        icon="delete"
        @click="confirmDelete(post.postId, i)"
      >
      </q-btn>
      <q-separator />
    </q-card-section>

    <div
      v-if="currentPage >= totalPage"
      class="text-center text-caption text-grey-8"
    >
      没有更多了哦
    </div>
    <q-btn
      color="grey-10"
      flat
      class="absolute full-width"
      :disable="currentPage >= totalPage"
      icon="more_horiz"
      @click="getMorePost"
    />
  </q-card>
</template>


<script>
import { collapse } from "../../utils/utils";
import { getMyPost, deleteMyPost } from "../../services/forum";
export default {
  data() {
    return {
      currentPage: 1,
      totalPage: null,

      limit: 6,
      postList: [],
    };
  },
  methods: {
    collapse(content, length) {
      return collapse(content, length);
    },
    confirmDelete(postId, index) {
      this.$q
        .dialog({
          title: "确认删除吗？",
          message: "帖子删除后就无法找回了哦！",
          cancel: true,
        })
        .onOk(() => {
          deleteMyPost({ postId }).then((resp) => {
            // //console.log(resp);
            if (resp.success) {
              this.postList.splice(index, 1);
              this.$q.notify({
                position: "top",
                type: "positive",
                message: `帖子删除成功`,
              });
            }
          });
        });
    },

    getMorePost() {
      this.currentPage += 1;

      getMyPost({
        currentPage: this.currentPage,
        limit: this.limit,
      })
        .then((resp) => {
          if (resp.success) {
            this.postList = this.postList.concat(resp.data.postList);
            // //console.log(this.postList);
            this.totalPage = resp.data.totalPage;
            this.currentPage = resp.data.currentPage;
          }
        })
        // .catch((e) => {
        //   //console.log(e);
        // });
    },
  },

  mounted() {
    getMyPost({
      currentPage: this.currentPage,
      limit: this.limit,
    })
      .then((resp) => {
        if (resp.success) {
          // //console.log(resp);
          this.postList = resp.data.postList;
          this.totalPage = resp.data.totalPage;
          this.currentPage = resp.data.currentPage;
        }
      })
      // .catch((e) => {
      //   //console.log(e);
      // });
  },
};
</script>

<style>
.title {
  font-size: 20px;
}
</style>