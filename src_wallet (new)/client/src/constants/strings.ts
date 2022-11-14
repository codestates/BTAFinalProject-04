const STRINGS = {
    /************************
     *   Global String 정보  *
     ***********************/
    GLOBAL: {
        PROJECT_NAME: 'HARMONY Wallet',
        PROJECT_DESCRIPTION: '아래 버튼을 눌러 시작하세요.',
        COIN_NAME: 'HARMONY',
    },
    /************************
     * Component String 정보 *
     ***********************/
    ACTION_CARD: {
        BRING: {
            PRIMARY: '아뇨. 비밀 복구 구문이 있습니다.',
            SECONDARY: '비밀 복구 구문을 사용하여 기존 지갑 가져오기',
            BUTTON_LABEL: '지갑 가져오기',
        },
        CREATE: {
            PRIMARY: '설정을 시작하죠!',
            SECONDARY: '새 지갑과  비밀 복구 구문이 만들어집니다.',
            BUTTON_LABEL: '지갑 생성하기',
        }
    },
    BUTTON_PAIR: {
        PREV_BUTTON: {
            DEFAULT_LABEL: '뒤로',
        },
        NEXT_BUTTON: {
            DEFAULT_LABEL: '다음으로',
        }
    },
    /************************
     *    Page String 정보   *
     ***********************/
    ALL_SET: {
        DESCRIPTION: '모두 완료되었습니다!\n이제 지갑을 둘러보세요.',
        TRANSFER: '송금이 완료되었습니다!',
    },
    SEED_CHECK: {
        DESCRIPTION: '앞서 생성한 구문을 입력해 주세요.',
        WARNING: '잊으셨다면 뒤로 가기를 눌러 다시 확인해 주세요. 이 단계는 정말 중요합니다!'
    },
    SEED_REVEAL: {
        DESCRIPTION: '비밀 복구 구문을 이용하면\n계정을 쉽게 백업하고 복구할 수 있습니다',
        WARNING: '경고:  비밀 복구 구문은 절대로 공개하지 마세요. \n이 구문이 있는 사람은 귀하의 자산을 탈취할 수 있습니다.'
    },
    WELCOME_BACK: {
        DESCRIPTION: '재방문을 환영합니다!',
        WARNING: '비밀번호를 입력해 주세요'
    }
}

export default STRINGS;
