import { MissionUtils } from "@woowacourse/mission-utils";
export default class Computer {
    constructor() {
        this.numbers = [];
    }
    pickRandomNumbers() {
        while (this.numbers.length < 3) {
            const number = MissionUtils.Random.pickNumberInRange(1, 9);
            if (!this.numbers.includes(number)) {
                this.numbers.push(number);
            }
        }
        console.log({ number: this.numbers });
    }
    async playGame(USER) {
        MissionUtils.Console.print("숫자 야구 게임을 시작합니다.");
        while (true) {
            while (true) {
                const INPUT = await USER.returnUserQuery(
                    "숫자를 입력해주세요 : "
                );
                const RESULT = this.returnMessage(INPUT);
                MissionUtils.Console.print(RESULT.result);
                if (RESULT.success) {
                    MissionUtils.Console.print(
                        "3개의 숫자를 모두 맞히셨습니다! 게임 종료"
                    );
                    break;
                }
            }
            MissionUtils.Console.print(
                "게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요."
            );
            if (USER.returnUserInput() === 2) break;
        }
    }
    returnMessage(expect_numbers) {
        const BALL_STRIKE = this.calculateBallStrike(expect_numbers);
        const RESULT = this.getResultString(BALL_STRIKE);
        if (BALL_STRIKE.strike === 3) return { result: RESULT, success: true };
        return { result: "", success: false };
    }
    calculateBallStrike(expect_numbers) {
        let ball = 0;
        let strike = 0;
        [...expect_numbers]
            .map((n) => +n)
            .forEach((n, idx) => {
                if (this.numbers[idx] === n) strike++;
                else if (this.numbers.includes(n)) ball++;
            });
        return { ball, strike };
    }
    getResultString({ ball, strike }) {
        if (ball === 0 && strike === 0) return "낫싱";
        else if (ball === 0) return `${strike}스트라이크`;
        else if (strike === 0) return `${ball}볼`;
        else return `${ball}볼 ${strike}스트라이크`;
    }

    clearNumbers() {}
}
