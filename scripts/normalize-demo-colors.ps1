# Normaliza hex -> var(--ds-*) nos demos (PowerShell)
$demosDir = (Resolve-Path (Join-Path (Join-Path $PSScriptRoot "..") "demos")).Path
$pairs = @(
    @{ p = '#F9F9F9\b'; r = 'var(--ds-bg-subtle)' }
    @{ p = '#FFFFFF\b'; r = 'var(--ds-bg)' }
    @{ p = '#ffffff\b'; r = 'var(--ds-bg)' }
    @{ p = '\b#fff\b'; r = 'var(--ds-bg)' }
    @{ p = '#E0E0E0\b'; r = 'var(--ds-border)' }
    @{ p = '#e0e0e0\b'; r = 'var(--ds-border)' }
    @{ p = '#1A1A1A\b'; r = 'var(--ds-n800)' }
    @{ p = '#333333\b'; r = 'var(--ds-n700)' }
    @{ p = '(?<![0-9a-fA-F])#333(?![0-9a-fA-F])'; r = 'var(--ds-text-default)' }
    @{ p = '#656976\b'; r = 'var(--ds-n500)' }
    @{ p = '#5E5E5E\b'; r = 'var(--ds-content-secondary)' }
    @{ p = '#393939\b'; r = 'var(--ds-content-primary)' }
    @{ p = '#727272\b'; r = 'var(--ds-content-tertiary)' }
    @{ p = '#04843B\b'; r = 'var(--ds-success)' }
    @{ p = '#005A1A\b'; r = 'var(--ds-success-fg)' }
    @{ p = '#004D16\b'; r = 'var(--ds-success-fg)' }
    @{ p = '#067647\b'; r = 'var(--ds-success-hover)' }
    @{ p = '#E6F4ED\b'; r = 'var(--ds-success-bg)' }
    @{ p = '#CCE9DB\b'; r = 'var(--ds-success-bg-hover)' }
    @{ p = '#DC2626\b'; r = 'var(--ds-error)' }
    @{ p = '#FEE2E2\b'; r = 'var(--ds-error-bg)' }
    @{ p = '#DC6803\b'; r = 'var(--ds-warning)' }
    @{ p = '#FEF3C7\b'; r = 'var(--ds-warning-bg)' }
    @{ p = '#92400E\b'; r = 'var(--ds-warning-fg)' }
    @{ p = '#3B82F6\b'; r = 'var(--ds-info)' }
    @{ p = '#DBEAFE\b'; r = 'var(--ds-info-bg)' }
    @{ p = '#1E40AF\b'; r = 'var(--ds-info-fg)' }
    @{ p = '#273959\b'; r = 'var(--ds-color-brand-secondary-900)' }
    @{ p = '#F5F5F5\b'; r = 'var(--ds-surface-hover)' }
    @{ p = '#f5f5f5\b'; r = 'var(--ds-surface-hover)' }
    @{ p = '#F3F4F6\b'; r = 'var(--ds-surface-muted)' }
    @{ p = '#f3f4f6\b'; r = 'var(--ds-surface-muted)' }
    @{ p = '#F3F3F3\b'; r = 'var(--ds-n100)' }
    @{ p = '#f3f3f3\b'; r = 'var(--ds-n100)' }
    @{ p = '#D0D0D0\b'; r = 'var(--ds-border-subtle)' }
    @{ p = '#d0d0d0\b'; r = 'var(--ds-border-subtle)' }
    @{ p = '#C6C6C6\b'; r = 'var(--ds-n200)' }
    @{ p = '#A8A8A8\b'; r = 'var(--ds-n300)' }
    @{ p = '#666666\b'; r = 'var(--ds-n500)' }
    @{ p = '(?<![0-9a-fA-F])#666(?![0-9a-fA-F])'; r = 'var(--ds-n500)' }
    @{ p = '#999999\b'; r = 'var(--ds-n300)' }
    @{ p = '(?<![0-9a-fA-F])#999(?![0-9a-fA-F])'; r = 'var(--ds-n300)' }
    @{ p = '#2b2b2b\b'; r = 'var(--ds-pre-fg)' }
    @{ p = '#F59E0B\b'; r = 'var(--ds-warning)' }
    @{ p = '#f0f0f0\b'; r = 'var(--ds-n100)' }
    @{ p = '#E6E6E6\b'; r = 'var(--ds-n200)' }
    @{ p = '#2B2B2B\b'; r = 'var(--ds-pre-fg)' }
    @{ p = '#DDDDDD\b'; r = 'var(--ds-border-muted)' }
    @{ p = '#dddddd\b'; r = 'var(--ds-border-muted)' }
    @{ p = '#EEEEEE\b'; r = 'var(--ds-separator-light)' }
    @{ p = '#eeeeee\b'; r = 'var(--ds-separator-light)' }
    @{ p = '#E8E8E8\b'; r = 'var(--ds-n200)' }
    @{ p = '#e8e8e8\b'; r = 'var(--ds-n200)' }
    @{ p = '#CDDCFF\b'; r = 'var(--ds-color-brand-secondary-100)' }
    @{ p = '#99D3B7\b'; r = 'var(--ds-success-bg-hover)' }
    @{ p = '#003D11\b'; r = 'var(--ds-success-fg)' }
    @{ p = '#6C6C6C\b'; r = 'var(--ds-n500)' }
    @{ p = '#000000\b'; r = 'var(--ds-n900)' }
    @{ p = '(?<![0-9a-fA-F])#000(?![0-9a-fA-F])'; r = 'var(--ds-n900)' }
    @{ p = 'stroke="#fff"'; r = 'stroke="currentColor"' }
    @{ p = "stroke='#fff'"; r = 'stroke="currentColor"' }
    @{ p = '#667eea\b'; r = 'var(--ds-hero-gradient-start)' }
    @{ p = '#764ba2\b'; r = 'var(--ds-hero-gradient-end)' }
    @{ p = '#ccc\b'; r = 'var(--ds-n300)' }
    @{ p = '#CCC\b'; r = 'var(--ds-n300)' }
    @{ p = 'background:#fff'; r = 'background:var(--ds-bg)' }
    @{ p = 'background: #fff'; r = 'background: var(--ds-bg)' }
    @{ p = 'color: #fff'; r = 'color: var(--ds-on-inverse)' }
    @{ p = 'color:#fff'; r = 'color:var(--ds-on-inverse)' }
)
$n = 0
Get-ChildItem -Path $demosDir -Filter "*.html" | ForEach-Object {
    $c = [IO.File]::ReadAllText($_.FullName)
    $orig = $c
    foreach ($item in $pairs) {
        $c = $c -replace $item.p, $item.r
    }
    if ($c -ne $orig) {
        [IO.File]::WriteAllText($_.FullName, $c, [Text.UTF8Encoding]::new($false))
        Write-Host "updated:" $_.Name
        $n++
    }
}
Write-Host "done, files changed:" $n
