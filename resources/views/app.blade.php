<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Critical inline CSS: ensures fast first paint without blocking --}}
        <style>
            *,*::before,*::after{box-sizing:border-box}
            html{background-color:#020617}
            body{margin:0;font-family:'Poppins',ui-sans-serif,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
        </style>

        <link rel="icon" href="/images/logo-smpn1tejakula.png" sizes="any">
        <link rel="apple-touch-icon" href="/images/logo-smpn1tejakula.png">

        @fonts

        {{-- Load CSS async (non-render-blocking) via preload + onload --}}
        @php
            $manifestPath = public_path('build/manifest.json');
            $manifest = file_exists($manifestPath) ? json_decode(file_get_contents($manifestPath), true) : null;
            $cssFile = $manifest['resources/css/app.css']['file'] ?? null;
        @endphp
        @if ($cssFile)
            <link rel="preload" href="{{ asset('build/' . $cssFile) }}" as="style" fetchpriority="high"
                  onload="this.onload=null;this.rel='stylesheet'">
            <noscript><link rel="stylesheet" href="{{ asset('build/' . $cssFile) }}"></noscript>
        @endif

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
