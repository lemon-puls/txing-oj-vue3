<template>
  <div id="courseWorksId">
    <div class="course-list" v-if="courseData.length > 0">
      <a-popover
        :trigger="'contextMenu'"
        :position="'bottom'"
        v-for="course in courseData"
        :key="course.id"
        style="width: 150px !important; border-radius: 10px"
      >
        <CourseItem
          :is-show-overlay="true"
          :course="course"
          @click="onClickCourse(course.id)"
        ></CourseItem>
        <template #content>
          <div class="ops-content" style="text-align: center">
            <a-space>
              <span class="ops-button" @click="onEdit(course.id)"
                ><SvgIcon icon="edit" :size="20" /> 编辑</span
              >
              <span class="ops-button" @click="onDelete(course.id)"
                ><SvgIcon icon="remove3" :size="20" /> 删除</span
              >
            </a-space>
          </div>
        </template>
      </a-popover>
    </div>
    <div class="page-plugin" v-if="courseData.length > 0">
      <a-pagination
        show-total
        :total="total"
        :page-size="pageParams.page.pageSize"
        @change="onCurrentChange"
      />
    </div>
    <a-empty v-else />
  </div>
</template>

<script setup lang="ts">
// const courseData = ref([]);
import { ref, watchEffect } from "vue";
import { CourseAppControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import CourseItem from "@/components/course/CourseItem.vue";
import SvgIcon from "@/icons/SvgIcon";
import { useUserStore } from "@/store/user";

const router = useRouter();
const userStore = useUserStore();
// 总页数
const total = ref(0);
const courseData = ref([]);
const pageParams = ref({
  filter: [
    {
      fieldName: "name",
      queryType: "like",
      value: "",
    },
    {
      fieldName: "userId",
      queryType: "eq",
      value: userStore.loginUser.id,
    },
  ],
  page: {
    current: 1,
    pageSize: 20,
  },
});
const onCurrentChange = (current: number) => {
  pageParams.value = {
    ...pageParams.value,
    page: {
      current: current,
      pageSize: 20,
    },
  };
};

const loadCourseData = async () => {
  const res = await CourseAppControllerService.searchCourseByPageUsingPost(
    pageParams.value
  );
  if (res.code != 0) {
    message.error("课程数据加载失败：", res.msg);
    return;
  }
  courseData.value.splice(0);
  total.value = res.data.total;
  courseData.value = res.data.list;
};
watchEffect(() => {
  loadCourseData();
});
const onClickCourse = (courseId: number) => {
  router.push({
    path: "/txing/course/video/play/" + courseId,
  });
};
/**
 * 编辑（更新）课程
 */
const onEdit = (courseId: number) => {
  router.push({
    path: "/txing/course/update",
    query: {
      courseId: courseId,
    },
  });
};
/**
 * 删除课程
 */
const onDelete = async (courseId: number) => {
  const res = await CourseAppControllerService.deleteCoursesUsingPost([
    courseId,
  ]);
  if (res.code != 0) {
    message.error("删除失败，", res.msg);
    return;
  }
  message.success("删除成功");
  loadCourseData();
};
</script>

<style scoped lang="scss">
#courseWorksId {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .course-list {
    width: 90%;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    justify-content: left;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 20px;
    row-gap: 25px;
  }

  .page-plugin {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
  }
}

.ops-content {
  .ops-button {
    display: flex;
    align-items: center;
    column-gap: 5px;

    &:hover {
      color: #007bff;
    }

    cursor: pointer;
  }
}
</style>
