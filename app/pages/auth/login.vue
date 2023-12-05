<script lang="ts" setup>
definePageMeta({
    layout: "empty",
});

const pocketbase = usePocketbase();
const email = ref<string | null>(null);
const password = ref<string | null>(null);
const remeberMe = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const toast = useToast();

// Login user
async function login() {
    isLoading.value = true;

    if (email && password) {
        await pocketbase.collection('users').authWithPassword(email.value as string, password.value as string).then((user) => {
            navigateTo('/')
        }).catch((error) => {
            console.log(error)

            toast.add({
                color: 'red',
                title: 'Error',
                description: "Invalid email or password",
                timeout: 3000
            })
        })
    }

    isLoading.value = false;
}
</script>

<template>
    <div class="justify-center content-center flex flex-wrap mt-8">
        <UCard>
            <div class="text-center mb-5">
                <img src="/images/logos/pocketnuxt.svg" alt="Image" height="50" class="mb-3">

                <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>

                <span class="text-600 font-medium line-height-3">Don't have an account?</span>

                <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" href="/auth/signup">Join now!</a>
            </div>

            <div>
                <label for="email" class="block text-900 font-medium mb-2">Email</label>

                <UInput id="email" type="text" class="w-full mb-3" v-model="email" />

                <label for="password" class="block text-900 font-medium mb-2">Password</label>

                <UInput id="password" type="password" class="w-full mb-3" v-model="password" />

                <div class="flex align-items-center justify-content-between mb-6">
                    <div class="flex align-items-center">
                        <UCheckbox id="rememberme1" :binary="true" v-model="remeberMe" class="mr-2" />
                        <label for="rememberme1">Remember me</label>
                    </div>

                    <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
                        href="/auth/forgotpassword">Forgot
                        password?</a>
                </div>

                <UButton label="Sign In" icon="i-heroicons-login" class="w-full" @click="login" :loading="isLoading"></UButton>
            </div>
        </UCard>
    </div>
</template>

