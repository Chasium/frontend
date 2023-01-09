<template>
    <el-row>
        <el-col :span="8">
            <el-card class="box-user">
                <div class="user">
                    <el-upload
                        class="avatar-uploader"
                        :show-file-list="false"
                        :auto-upload="true"
                        :before-upload="beforeImageUpload"
                        :http-request="handleUpImage"
                        :on-change="handleChange"
                    >
                        <img v-if="imgPath" :src="imgPath" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon"
                            ><Plus
                        /></el-icon>
                    </el-upload>
                    <div class="user-info">
                        <p class="name">{{ name }}</p>
                        <el-form>
                            <el-form-item v-if="clickedButton == true">
                                <input
                                    v-model="newName"
                                    placeholder="请输入新的用户名"
                                    class="input_data"
                                />
                            </el-form-item>
                        </el-form>
                        <p class="id">
                            用户名：<span>{{ id }}</span>
                        </p>
                        <p class="time">
                            游戏总时长：<span>{{ gamingTime }}</span>
                        </p>
                    </div>
                    <div class="changeName">
                        <el-button
                            class="submitButton"
                            v-if="clickedButton"
                            @click="changeName"
                            >提交</el-button
                        >
                        <el-button
                            class="nameButton"
                            v-else
                            @click="clickedButton = true"
                            >改名</el-button
                        >
                    </div>
                </div>
                <div class="login-info">
                    <p>
                        上次登录时间：<span>{{ time }}</span>
                    </p>
                </div>
            </el-card>
            <el-card class="box-data"> </el-card>
        </el-col>
        <el-col :span="16">
            <el-card class="box-game-data">
                <el-scrollbar max-height="780px">
                    <div
                        v-for="item in gameRecord"
                        :key="item.id"
                        class="scrollbar-demo-item"
                    >
                        <img :src="item.img" />
                        <p>{{ item.name }}</p>
                        <p>{{ item.beginTime }} ~ {{ item.endTime }}</p>
                    </div>
                </el-scrollbar>
            </el-card>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/user';
import { HTTPApi } from '@/apigen';
import { Plus } from '@element-plus/icons-vue';

export default defineComponent({
    data() {
        return {
            id: 'Boinzz',
            imgPath: '',
            name: '',
            newName: '',
            gamingTime: '100小时',
            time: '2022/11/23 18:55:00',
            clickedButton: false,
            gameRecord: [
                {
                    img: 'http://localhost:8080/src/assets/images/Cthulhu.png',
                    name: '龙族世界',
                    id: 1,
                    beginTime: '2022年10月4日20:00',
                    endTime: '2022年10月4日23:00',
                },
                {
                    img: 'http://localhost:8080/src/assets/images/Cthulhu.png',
                    name: '克苏鲁的呼唤',
                    id: 2,
                    beginTime: '2022年10月4日20:00',
                    endTime: '2022年10月4日23:00',
                },
            ],
        };
    },
    async created() {
        // get id
        try {
            let response = await HTTPApi.post('/user/get-id', {
                session: useUserStore().session,
            });
            console.log('created got response: ', response.code);
            if (response.code === 1) {
                alert('user not found');
                return;
            }
            this.id = response.id;
        } catch (err) {
            alert('异常');
        }
        // get name
        try {
            let response = await HTTPApi.post('/user/get-my-name', {
                session: useUserStore().session,
            });
            console.log('created got response: ', response.code);
            if (response.code === 1) {
                alert('user not found');
                return;
            }
            this.name = response.name;
            this.newName = this.name;
        } catch (err) {
            alert('异常');
        }
        // TODO: get last login time
        try {
            let response = await HTTPApi.post('/user/get-my-info', {
                session: useUserStore().session,
            });
            console.log('created got response: ', response.code);
            if (response.code === 1) {
                alert('user not found');
                return;
            } else if (response.code === 2) {
                // 如果用户还没有存过头像
                this.imgPath =
                    'http://localhost:8080/src/assets/images/noImage.png';
                console.log('no initial image');
                return;
            }
            // 显示数据库中的头像
            this.imgPath = response.img;
        } catch (err) {
            alert('异常');
        }
    },
    methods: {
        async changeName() {
            if (this.newName === '') {
                alert('用户名不能为空');
                return;
            }
            try {
                let response = await HTTPApi.post('/user/modify-name', {
                    session: useUserStore().session,
                    newName: this.newName,
                });
                console.log('got response: ', response.code);
                if (response.code === 1) {
                    alert('user not found');
                    return;
                }
            } catch (err) {
                alert('异常');
            }
            this.name = this.newName;
            this.clickedButton = false;
        },
        // 上传前，限制的上传图片大小
        beforeImageUpload(rawFile: any) {
            if (rawFile.size / 1024 > 5) {
                alert('单张图片大小不能超过5KB!');
                return false;
            }
            return true;
        },
        getBase64(file: Blob) {
            return new Promise(function (resolve, reject) {
                let reader = new FileReader();
                let imgResult = '';
                reader.readAsDataURL(file);
                reader.onload = function () {
                    if (!(typeof reader.result == 'string')) {
                        throw new Error('Unknown error');
                    }
                    imgResult = reader.result;
                };
                reader.onerror = function (error) {
                    reject(error);
                };
                reader.onloadend = function () {
                    resolve(imgResult);
                };
            });
        },
        // 上传成功，获取返回的图片地址
        async handleUpImage(upload_file: any) {
            console.log('enter handle upload with file: ', upload_file.file);
            let test = await this.getBase64(upload_file.file).then((res) => {
                console.log(res, ' type: ', typeof res);
                return res as string;
            });
            console.log('test: ', test);
            try {
                let response = await HTTPApi.post('/user/modifyAvatar', {
                    session: useUserStore().session,
                    img: test,
                });
                console.log('got response: ', response.code);
                if (response.code === 1) {
                    alert('user not found');
                    return;
                }
                // 立即显示更换了的头像
                location.reload();
            } catch (err) {
                alert('异常');
            }
        },
        handleChange() {
            console.log('enter handle change ');
        },
        async getId() {
            return 'Boinzz';
        },
        async getTime() {
            return '2022/11/23 18:55:00';
        },
    },
});
</script>

<style lang="scss" scoped>
.box-user {
    min-width: 470px;
    min-height: 280px;
}
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.user {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1.5px solid #ccc;
    display: flex;
    align-items: center;
    .user-info {
        margin-left: 30px;
        .name {
            font-size: 25px;
            margin-bottom: 10px;
        }
        .id {
            color: #666666;
        }
        .time {
            color: #666666;
        }
    }
}
.changeName {
    .submitButton {
        margin-top: -40px;
        margin-left: 20px;
    }
    .nameButton {
        margin-top: -60px;
        margin-left: 20px;
    }
}
.login-info {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #555555;
        span {
            color: #555555;
            margin-left: 80px;
        }
    }
}
.box-data {
    margin-top: 20px;
}
.box-game-data {
    margin-left: 80px;
    min-width: 880px;
    .scrollbar-demo-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        margin: 10px;
        text-align: center;
        border-radius: 5px;
        background: var(--el-color-primary-light-9);
        color: var(--el-color-primary);
    }
    img {
        width: 60px;
        height: 40px;
    }
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
