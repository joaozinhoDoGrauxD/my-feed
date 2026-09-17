import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useSession } from '@/services/auth/session';
import Theme from "@/components/core/Theme";
import { SessionProvider } from "@/services/auth/sessionProvider";

function AppLayout() {
    const { session, isLoading } = useSession();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;

        const inAppGroup = segments[0] === '(app)';

        if (!session && inAppGroup) {
            router.replace('/sign-in');
        } else if (session && !inAppGroup) {
            router.replace('/');
        }
    }, [session, isLoading, segments, router]);

    if (isLoading) {
        return null;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='(app)' />
            <Stack.Screen name='sign-in' />
            <Stack.Screen name='sign-up' />
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <Theme>
            <SessionProvider>
                <AppLayout />
            </SessionProvider>
        </Theme>
    );
}