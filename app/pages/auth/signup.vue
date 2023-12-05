<script lang="ts" setup>
definePageMeta({
    layout: "empty",
});

const pocketbase = usePocketbase();
const email = ref<string | null>(null);
const password = ref<string | null>(null);
const confirmPassword = ref<string | null>(null);
const isLoading = ref<boolean>(false);
const toast = useToast();

// Signup user
async function signUp() {
    isLoading.value = true;

    if (email && password && password.value === confirmPassword.value) {
        await pocketbase.collection('users').create({
            email: email.value,
            password: password.value,
            passwordConfirm: confirmPassword.value
        }).then((resp) => {
            loginUser()
        }).catch((error) => {
            console.log(error)

            toast.add({
                color: 'red',
                title: 'Error',
                description: error.data || "Unknown Error",
                timeout: 3000
            })
        })
    } else {
        toast.add({
            color: 'red',
            title: 'Error',
            description: "Password confirmation does not match",
            timeout: 3000
        })
    }

    isLoading.value = false;
}

// Login user
async function loginUser() {
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



</script>

<template>
    <div class="justify-center content-center flex flex-wrap mt-8">
        <UCard>
            <div class="text-center mb-5">
                <img src="/images/logos/pocketnuxt.svg" alt="Image" height="50" class="mb-3">
                <div class="text-900 text-3xl font-medium mb-3">Join Now!</div>
                <span class="text-600 font-medium line-height-3">Already have an account?</span>
                <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" href="/auth/login">Back to
                    login</a>
            </div>

            <div>
                <label for="email" class="block text-900 font-medium mb-2">Email</label>
                <UInput id="email" type="text" class="w-full mb-3" v-model="email" />

                <label for="password" class="block text-900 font-medium mb-2">Password</label>
                <UInput id="password" type="password" class="w-full mb-3" v-model="password" />

                <label for="password" class="block text-900 font-medium mb-2">Confirm Password</label>
                <UInput id="confirmPassword" type="password" class="w-full mb-3" v-model="confirmPassword" />

                <UButton label="Sign In" icon="i-heroicons-login" class="w-full" @click="signUp" :loading="isLoading"></UButton>
            </div>
        </UCard>
    </div>
</template>

