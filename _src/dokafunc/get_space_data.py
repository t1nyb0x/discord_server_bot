import requests
import json
from typing import Union
import datetime
import pytz

class GetSpaceData():
    """
    GetSpaceData

    Twitter Spaces取得に関するインスタンス
    """
    def __init__(self, bearer: str) -> None:
        self.base = 'https://api.twitter.com/2/spaces/by/creator_ids?'
        self.space_fields = 'id,state,participant_count,title,created_at'
        self.expansions = 'invited_user_ids,speaker_ids,creator_id,host_ids'
        self.user_fields = 'id,name,profile_image_url,public_metrics,url,username,withheld'
        self.barer = bearer
        self.json_path = 'spacedata/space_history.json'

    def search(self, user_id: str) -> Union[str, dict, None]:
        """
        yuma_mhsが作成したspaceを探す
        """
        headers = {'Authorization': self.barer}
        api_url = self.base + 'user_ids=' + user_id + \
            '&space.fields=' + self.space_fields + \
            '&expansions=' + self.expansions + \
            '&user.fields=' + self.user_fields
        space_obj = requests.get(api_url, headers=headers)
        if json.loads(space_obj.text)['meta']['result_count'] != 0:
            return self.parse(json.loads(space_obj.text))
        else:
            # return 'スペースが見つかりませんでした'
            return ''

    # def check_duplicate_space_id(self, space_id: str) -> bool:
    #     latest_space_id = self.read_space_info()
    #     if latest_space_id['latest'] == space_id:
    #         return True
    #     else:
    #         return False

    def parse(self, space_obj: dict) -> dict :
        """
        TwitterAPIから返却されたデータから、
        Discordへ発信する情報に加工する

        Parameters
        ----------
        space_obj: dict
        APIから返却されたスペースオブジェクト

        Returns
        -------
        dict
        Discordへ渡すスペース情報
        """
        space_id: str = space_obj['data'][0]['id']

        # 重複チェック 重複の場合、
        # if self.check_duplicate_space_id(space_id):
        #     return {}

        state: str = space_obj['data'][0]['state']
        speaker_info: list = space_obj['includes']['users']
        participant_count: str = space_obj['data'][0]['participant_count']
        if space_obj['data'][0]['title']:
            title: str = space_obj['data'][0]['title']
        else:
            title: str = '無題'

        created_at = space_obj['data'][0]['created_at']
        created_at = self.isogmt_to_strjst(isogmt=created_at)

        space_info = {
            'space_id': space_id,
            'state': state,
            'participant_count': participant_count,
            'title': title,
            'speaker_info': speaker_info,
            'created_at': created_at
        }

        # スペースIDをJSONへ保存
        # self.save_space_info(space_id)

        return space_info

    def isogmt_to_strjst(self, isogmt: Union[str, None]) -> str :
        """
        TwitterAPIから受け取ったGMT（ISO表記）を
        JST（文字列）変換する。
        時間が取得できない場合は、空文字列を返却する

        Parameters
        ----------
        isogmt: Union[str, None]
        ISO表記GMT時間

        Returns
        ----------
        str
        JST時間
        """
        if isogmt is None:
            return ''
        else:
            dt = datetime.datetime.strptime(isogmt, '%Y-%m-%dT%H:%M:%S.%fZ')
            dt = pytz.utc.localize(dt).astimezone(pytz.timezone("Asia/Tokyo"))
            return dt.strftime('%Y/%m/%d %H:%M:%S')

    # def read_space_info(self):
    #     """
    #     前回取得したスペースIDを取得する
    #     """
    #     with open(self.json_path, mode='r') as f:
    #         previous_space_info = f.read()

    #     return json.loads(previous_space_info)

    # def save_space_info(self, space_id: str) -> None:
    #     """
    #     取得したスペースIDをJSONへ書き込む

    #     Parameters
    #     ----------
    #     space_id : str
    #     スペースID

    #     Returns
    #     ----------
    #     None
    #     """

    #     latest_space_id = json.dumps(
    #         {'latest': space_id}, separators=(',', ':')
    #     )

    #     with open(self.json_path,  mode='w') as f:
    #         f.write(latest_space_id)