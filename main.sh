#!bin/bash
BRANCH_NAME=$1
COMMIT_MESSAGE=$2

if [ ! -n "$BRANCH_NAME" ]
then
   echo "$BRANCH_NAME - Error \$BRANCH_NAME not set or NULL"
elif [ ! -n "$COMMIT_MESSAGE" ]
then
   echo "$COMMIT_MESSAGE - Error \$COMMIT_MESSAGE not set or NULL"
else
   git checkout -b $BRANCH_NAME
   git add .
   git commit -m "$COMMIT_MESSAGE"
   git push origin $BRANCH_NAME
   git checkout master 
   git pull origin master

   echo $BRANCH_NAME $COMMIT_MESSAGE
fi