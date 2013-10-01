Because me and drew (and possibly mek) are the only one's with a copy of Mek's
commits, the only way to recover them is to use git update-ref (no reflog will
exist on someone who pulls this repo containing them because they will be
pulling a forcible revised history).

This branch contains the unrevised history, consequently you are advised not to
merge/rebase changes from this onto any other branch derived from master (all
of them right now), cherry-pick should work though.
