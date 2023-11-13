<template>
  <el-form label-width="120px" v-loading="loading">
    <el-form-item label="语音风格">
      <el-select
        v-model="voice"
        class="m-2"
        placeholder="请选择语音风格"
        size="large"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="转换文本">
      <el-input
        v-model="text"
        type="textarea"
        placeholder="输入文本..."
        :rows="4"
        :maxlength="100"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="convertToSpeech">Create</el-button>
      <el-button @click="cancel">Cancel</el-button>
    </el-form-item>
    <el-form-item>
      <audio
        v-if="audioSrc"
        :src="audioSrc"
        controls
        style="margin-top: 10px"
      ></audio>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { ref } from "vue";
import { ElInput, ElButton, ElMessage } from "element-plus";
</script>

<script setup lang="ts">
const loading = ref(false);
const voice = ref("");
const options = [
  {
    value: "alloy",
    label: "alloy",
  },
  {
    value: "echo",
    label: "echo",
  },
  {
    value: "fable",
    label: "fable",
  },
  {
    value: "onyx",
    label: "onyx",
  },
  {
    value: "nova",
    label: "nova",
  },
  {
    value: "shimmer",
    label: "shimmer",
  },
];

const text = ref("");
const audioSrc = ref("");
const convertToSpeech = async () => {
  if (!voice.value) {
    ElMessage({
      message: "请选择语音的类型",
      type: "warning",
    });
    return;
  }
  if (!text.value) {
    ElMessage({
      message: "请输入文本",
      type: "warning",
    });
    return;
  }
  const apiUrl = "/speech";
  try {
    loading.value = true;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text.value, voice: voice.value }),
    });

    if (response.ok) {
      const blob = await response.blob();
      audioSrc.value = URL.createObjectURL(blob);
    } else {
      console.error("Error fetching speech");
    }
  } catch (error) {
    console.error("Error:", error);
  }
  loading.value = false;
};

const cancel = () => {
  voice.value = "";
  text.value = "";
  audioSrc.value = "";
};
</script>

<style>
/* 添加一些基本的样式 */
textarea {
  width: 300px;
  height: 100px;
}
button {
  margin-top: 10px;
}
</style>
