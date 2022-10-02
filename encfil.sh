#bash
function join_by {
  local d=${1-} f=${2-}
  if shift 2; then
    printf %s "$f" "${@/#/$d}"
  fi
}

readarray -t a < .env
for each in "${a[@]}"
do
  
  echo "$each"
done

join_by $'\n' "${a[@]}"