# Git setup 
## Ref 
- https://git-scm.com/book/en/v2/Git-on-the-Server-Setting-Up-the-Server
- https://phoenixnap.com/kb/ssh-port-forwarding
- https://superuser.com/questions/827934/ssh-port-forwarding-without-session
- https://unix.stackexchange.com/questions/14312/how-to-restrict-an-ssh-user-to-only-allow-ssh-tunneling
- https://superuser.com/questions/388407/openssh-restriction-on-local-port-forwarding-for-groups

## Steps
- There is no git service. Just call git to commit (local) and push (ssh)
- Prepare git user
       - install git : > apt-get install git-all
       - add git user : > useradd git 
       - clone tsw (from github) in /srv/git
       - the url is git@10.12.163.13:/srv/git/tsw/.git 
       - git user allow git-shell : > chsh -s $(which git-shell) git 
       - sshd_config:
              Match User git
                     X11Forwarding no
                     AllowTcpForwarding no
                     PermitTTY no
- Test security 
- > ssh -Nf -L 122:10.12.163.12:22 git@10.12.163.13
- > ssh -R 3333:localhost:3000 swadmin@10.12.163.13

## Git branch 
- Ref:
       - https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell
       - https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F#what_is_git_section
- Checking:
       - snapshot are in \.git\objects\
       - Current branch ref : \.git\HEAD
       - branch current commit: \.git\refs\heads\{current branch}


## Bash 
- https://coderwall.com/p/fasnya/add-git-branch-name-to-bash-prompt