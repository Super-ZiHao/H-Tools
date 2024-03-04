import { onBeforeMount, onMounted } from 'vue';

export default function useLoading() {
  onMounted(() => {
    console.log('加载后')
  })
}