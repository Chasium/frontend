<template>
    <div class="header-container">
        <div class="icon">
            <img src="../assets/images/WhiteBg.png" />
            <div class="text-icon">Chasium</div>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img v-if="imgPath" :src="imgPath" class="user-img" />
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="clickUser"
                            >个人中心</el-dropdown-item
                        >
                        <el-dropdown-item @click="exitUser"
                            >退出账户</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { HTTPApi } from '@/apigen';
import { ElMessage, ElMessageBox } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';
import { createDOMCompilerError } from '@vue/compiler-dom';
import { useUserStore } from '@/stores/user';

export default defineComponent({
    data() {
        return {
            imgPath: 'http://localhost:8080/src/assets/images/noImage.png',
        };
    },
    async created() {
        try {
            let response = await HTTPApi.post('/user/get-my-info', {
                session: useUserStore().session,
            });
            console.log('created got response: ', response.code);
            if (response.code === 1) {
                alert('user not found');
                return;
            }
            else if (response.code === 2) {
                this.imgPath = 'http://localhost:8080/src/assets/images/noImage.png';
                console.log("no initial image");
                return;
            }
            // 显示数据库中的头像
            this.imgPath = response.img;
        } catch (err) {
            alert('异常');
        }
    },
    methods: {
        clickUser() {
            this.$router.push('/home/user');
        },
        exitUser() {
            ElMessageBox.confirm('确认退出账户？', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '返回',
                type: 'warning',
            })
                .then(() => {
                    this.$router.push('/');
                    ElMessage({
                        type: 'success',
                        message: '用户已退出',
                    });
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '取消退出',
                    });
                });
        },
    },
});
</script>

<style lang="scss" scoped>
.header-container {
    padding: 0 20px;
    background-color: #363d40;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
        height: 48px;
        display: flex;
        img {
            width: 45px;
            height: 45px;
        }
        .text-icon {
            line-height: 48px;
            color: #fff;
            font-size: 25px;
            margin-left: 8px;
            margin-bottom: 10px;
        }
    }
    .r-content {
        img {
            height: 45px;
            width: 45px;
            border-radius: 50%;
        }
    }
}
</style>
