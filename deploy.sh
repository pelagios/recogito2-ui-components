# A simple helper to build & copy all widgets to the Recogito working folder.
# Use at your own risk!
echo '~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
echo 'Building activity stats page'
echo '~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
(cd ./stats/activity ; npm run build )

echo '~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
echo 'Building entity stats page'
echo '~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
( cd ./stats/entity ; npm run build )

echo '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
echo 'Done. Removing previous build from Recogito'
echo '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
rm ../recogito2/public/javascripts/widgets/*.js

echo '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
echo 'Copying files to Recogito'
echo '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
cp ./stats/activity/dist/*.js ../recogito2/public/javascripts/widgets/.
cp ./stats/entity/dist/*.js ../recogito2/public/javascripts/widgets/.

