/**
* Created by zhangxin on 2017/4/5.
*/
<template>
    <div class="right-form login-form">
        <h1 class="login-title">
            <span>登录</span>
        </h1>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="ruleForm" >
            <el-form-item label="账号：" prop="user" class="login-input-box">
                <span class="userNameImg"></span>
                <el-input type="text" name="username" icon="username" v-model="ruleForm.user" placeholder="请输入账号/手机号/邮箱"  ></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="pass" class="login-input-box">
                <span class="passwordImg"></span>
                <el-input type="password" name="password" icon="password" v-model="ruleForm.pass" placeholder="请输入密码" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item class="login-text-color clearfix">
                <el-col :span="12">
                    <!--
                    <el-checkbox v-model="ruleForm.rememberMe"  name="rememberMe" id="rememberMe">记住密码</el-checkbox>
                    -->
                </el-col>
                <el-col :span="12" class="text-right" style="float: right">
                    <router-link to="/forget">忘记密码</router-link>
                </el-col>
            </el-form-item>
            <el-form-item class="btn-box">
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
            <el-form-item class="btn-box ">
                <el-button type="primary white-primary" @click="probation()">申请试用</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import '../script/security';
    export default{
        data(){
            return {
                ruleForm: {
                    user: '',
                    pass: '',
                    rememberMe: false,
                },
                rules:{
                    user:[
                        { required: true, message: '请输入账号/手机号/邮箱', trigger: 'blur' },
                    ],
                    pass:[
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        components:{},
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('/apis/security/generateKey.do').then((response) => {
                                if (response.data.success) {
                                    let exponent = response.data.data.publicKeyExponent;
                                    let modulus = response.data.data.publicKeyModulus;
                                    RSAUtils.setMaxDigits(200);
                                    let key = new RSAUtils.getKeyPair(exponent, "", modulus);
                                    var password =  $('input[name=password]').val();
                                    let encrypedPwd = RSAUtils.encryptedString(key,password);
//                                    $('input[name=password]').val(encrypedPwd);
//                                    $(".ruleForm").submit();
                                    let param = {
                                        username: this.ruleForm.user,
                                        password: encrypedPwd
                                    }
                                    this.requestLogin(param);
                                } else {
                                    console.error(response.data.msg);
                                    return false;
                                }
                            }, (response) => {
                                console.error(response);
                                return false;
                            }
                        );
                    } else {
                        this.$message({message:'登录校验失败!',type:"error"});
                        return false;
                    }
                });
            },

            requestLogin(param){
                this.$http.post('/apis/login.do', param, {emulateJSON: true}).then(
                    function (response) {
                        let res = eval('(' + response.bodyText + ')');
                        if(!res.success){
                            this.$message.error(res.message);
                            return ;
                        }

                        this.$router.replace('/home/industryNews');
                    }
                )
            },

            resetForm(formName) {
                /*重置表单*/
                this.$refs[formName].resetFields();
            },
            probation(){
                this.$router.push({path:"/probation"})
            }
        },
        mounted(){
            this.$refs['ruleForm'].resetFields();
        }
    }
</script>
<style lang="scss">
    .userNameImg{
        position: absolute;
        left: 5px;
        top: 22px;
        width: 22px;
        height: 24px;
        background: url("../../../assets/images/login@1x.png") -2px -2px no-repeat;
    }
    .passwordImg{
        position: absolute;
        left: 8px;
        top: 22px;
        width: 18px;
        height: 24px;
        background: url("../../../assets/images/login@1x.png") -27px -2px no-repeat;

    }
</style>
