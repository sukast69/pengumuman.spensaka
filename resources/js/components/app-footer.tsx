import { Heart } from 'lucide-react';

type Props = {
    variant?: 'light' | 'dark';
};

export default function AppFooter({ variant = 'light' }: Props) {
    const isDark = variant === 'dark';

    return (
        <div
            className={`w-full border-t px-4 py-4 text-center text-xs ${
                isDark
                    ? 'border-white/10 bg-transparent text-white/40'
                    : 'border-gray-200 bg-white text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-500'
            }`}
        >
            Made with{' '}
            <Heart className="-mt-0.5 inline-block h-3 w-3 fill-red-500 text-red-500" />{' '}
            Kadek Suka Astawa, S.Kom. (085737664624)
        </div>
    );
}
