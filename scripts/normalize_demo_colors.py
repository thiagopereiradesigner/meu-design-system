# -*- coding: utf-8 -*-
"""Substitui hex frequentes por var(--ds-*) nos demos HTML."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DEMOS = ROOT / "demos"

# (pattern, replacement) — ordem importa (strings longas primeiro)
REPLACEMENTS = [
    (re.compile(r"#F9F9F9\b", re.I), "var(--ds-bg-subtle)"),
    (re.compile(r"#FFFFFF\b", re.I), "var(--ds-bg)"),
    (re.compile(r"#ffffff\b", re.I), "var(--ds-bg)"),
    (re.compile(r"\b#fff\b", re.I), "var(--ds-bg)"),
    (re.compile(r"#E0E0E0\b", re.I), "var(--ds-border)"),
    (re.compile(r"#e0e0e0\b", re.I), "var(--ds-border)"),
    (re.compile(r"#1A1A1A\b", re.I), "var(--ds-n800)"),
    (re.compile(r"#333333\b", re.I), "var(--ds-n700)"),
    (re.compile(r"(?<![0-9a-fA-F])#333(?![0-9a-fA-F])"), "var(--ds-text-default)"),
    (re.compile(r"#656976\b", re.I), "var(--ds-n500)"),
    (re.compile(r"#5E5E5E\b", re.I), "var(--ds-content-secondary)"),
    (re.compile(r"#393939\b", re.I), "var(--ds-content-primary)"),
    (re.compile(r"#727272\b", re.I), "var(--ds-content-tertiary)"),
    (re.compile(r"#04843B\b", re.I), "var(--ds-success)"),
    (re.compile(r"#005A1A\b", re.I), "var(--ds-success-fg)"),
    (re.compile(r"#004D16\b", re.I), "var(--ds-success-fg)"),
    (re.compile(r"#067647\b", re.I), "var(--ds-success-hover)"),
    (re.compile(r"#E6F4ED\b", re.I), "var(--ds-success-bg)"),
    (re.compile(r"#CCE9DB\b", re.I), "var(--ds-success-bg-hover)"),
    (re.compile(r"#DC2626\b", re.I), "var(--ds-error)"),
    (re.compile(r"#FEE2E2\b", re.I), "var(--ds-error-bg)"),
    (re.compile(r"#DC6803\b", re.I), "var(--ds-warning)"),
    (re.compile(r"#FEF3C7\b", re.I), "var(--ds-warning-bg)"),
    (re.compile(r"#92400E\b", re.I), "var(--ds-warning-fg)"),
    (re.compile(r"#3B82F6\b", re.I), "var(--ds-info)"),
    (re.compile(r"#DBEAFE\b", re.I), "var(--ds-info-bg)"),
    (re.compile(r"#1E40AF\b", re.I), "var(--ds-info-fg)"),
    (re.compile(r"#273959\b", re.I), "var(--ds-color-brand-secondary-900)"),
    (re.compile(r"#F5F5F5\b", re.I), "var(--ds-surface-hover)"),
    (re.compile(r"#f5f5f5\b", re.I), "var(--ds-surface-hover)"),
    (re.compile(r"#F3F4F6\b", re.I), "var(--ds-surface-muted)"),
    (re.compile(r"#f3f4f6\b", re.I), "var(--ds-surface-muted)"),
    (re.compile(r"#F3F3F3\b", re.I), "var(--ds-n100)"),
    (re.compile(r"#f3f3f3\b", re.I), "var(--ds-n100)"),
    (re.compile(r"#D0D0D0\b", re.I), "var(--ds-border-subtle)"),
    (re.compile(r"#d0d0d0\b", re.I), "var(--ds-border-subtle)"),
    (re.compile(r"#C6C6C6\b", re.I), "var(--ds-n200)"),
    (re.compile(r"#A8A8A8\b", re.I), "var(--ds-n300)"),
    (re.compile(r"#666666\b", re.I), "var(--ds-n500)"),
    (re.compile(r"(?<![0-9a-fA-F])#666(?![0-9a-fA-F])"), "var(--ds-n500)"),
    (re.compile(r"#999999\b", re.I), "var(--ds-n300)"),
    (re.compile(r"(?<![0-9a-fA-F])#999(?![0-9a-fA-F])"), "var(--ds-n300)"),
    (re.compile(r"#2b2b2b\b", re.I), "var(--ds-pre-fg)"),
    (re.compile(r"#F59E0B\b", re.I), "var(--ds-warning)"),
    (re.compile(r"#f0f0f0\b", re.I), "var(--ds-n100)"),
    (re.compile(r"#E6E6E6\b", re.I), "var(--ds-n200)"),
    (re.compile(r"#2B2B2B\b", re.I), "var(--ds-pre-fg)"),
]


def normalize(content: str) -> str:
    out = content
    for pat, rep in REPLACEMENTS:
        out = pat.sub(rep, out)
    return out


def main():
    changed = 0
    for path in sorted(DEMOS.glob("*.html")):
        before = path.read_text(encoding="utf-8")
        after = normalize(before)
        if after != before:
            path.write_text(after, encoding="utf-8")
            print("updated:", path.name)
            changed += 1
    print("done, files changed:", changed)


if __name__ == "__main__":
    main()
