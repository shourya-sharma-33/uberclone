import subprocess
from datetime import datetime, timedelta

# Get today's date
today = datetime.now()

for i in range(5):
    day = today - timedelta(days=i)
    day_str = day.strftime("%Y-%m-%d")

    # Git log command: show commits for that date, oldest first, only 1st commit
    cmd = [
        "git", "log",
        "--since", f"{day_str} 00:00",
        "--until", f"{day_str} 23:59",
        "--reverse",        # oldest first
        "--pretty=format:%h %ad %s",  # short hash, date, commit message
        "--date=short"
    ]

    result = subprocess.run(cmd, capture_output=True, text=True).stdout.strip()
    if result:
        first_commit = result.split("\n")[0]
        print(f"{day_str}: {first_commit}")
    else:
        print(f"{day_str}: No commits")
