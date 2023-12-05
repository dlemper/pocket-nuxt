<script lang="ts" setup>
definePageMeta({
    layout: "empty",
});

const pocketbase = usePocketbase();
const email = ref<string | null>(null);
const isLoading = ref<boolean>(false);
const toast = useToast();

// Reset user password
async function resetPassword() {
    isLoading.value = true;

    if (email) {
        await pocketbase.collection('users').requestPasswordReset(email.value as string).then(() => {
            toast.add({
                color: 'green',
                title: 'Success',
                description: "Password reset email sent",
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
            <template #header>
                <div class="text-center mb-5">
                    <img src="/images/logos/pocketnuxt.svg" alt="Image" height="50" class="mb-3">

                    <div class="text-900 text-3xl font-medium mb-3">Reset Password</div>

                    <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" href="/auth/login">Back to
                        Login</a>
                </div>
            </template>

            <div>
                <label for="email" class="block text-900 font-medium mb-2">Email</label>

                <UInput id="email" type="text" class="w-full mb-3" v-model="email" />

                <UButton label="Submit" icon="i-heroicons-envelope" class="w-full" @click="resetPassword" :loading="isLoading">
                </UButton>
            </div>
        </UCard>
    </div>
</template>

